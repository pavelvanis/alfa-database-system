"use client";
import { Prescription } from "@/models/types";
import { createContext, useContext, useEffect, useState } from "react";
import { boolean } from "webidl-conversions";

export interface ISession {
  data: {
    prescriptions: Prescription[] | null;
  };
  loading: boolean;
  setData: (data: ISession["data"]) => void;
}

const SessionContext = createContext<ISession>({
  data: {
    prescriptions: null,
  },
  loading: false,
  setData: () => {},
});

export const useSession = () => {
  return useContext(SessionContext);
};

const SessionProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: ISession["data"];
}) => {
  const [data, setData] = useState<ISession["data"]>(
    initialData || { prescriptions: null }
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // setLoading(true);
    fetch("http://localhost:3000/api/prescriptions", {
      next: { revalidate: 10000 },
    })
      .then((response) => response.json())
      .then((prescriptions) => {
        setData({ prescriptions });
        setLoading(false);
      })
      .then(() => console.log("Prescriptions fetched"));
  }, []);

  return (
    <SessionContext.Provider value={{ data, setData, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
