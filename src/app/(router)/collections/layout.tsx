import { ReactNode } from "react";

const CollectionsLayout = ({
  children,
  patients,
  doctors,
  departments,
  medical_workspaces,
  medicines,
  prescriptions,
}: {
  children: ReactNode;
  patients: ReactNode;
  doctors: ReactNode;
  departments: ReactNode;
  medical_workspaces: ReactNode;
  medicines: ReactNode;
  prescriptions: ReactNode;
}) => {
  return (
    <>
      <div className="flex flex-wrap gap-10 justify-center">
        {medical_workspaces}
        {departments}
        {patients}
        {doctors}
        {medicines}
        {prescriptions}
      </div>
      {children}
    </>
  );
};

export default CollectionsLayout;
