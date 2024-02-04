import SessionProvider from "@/components/providers/SessionProvider";
import { PrescriptionModel } from "@/models";
import { Prescription } from "@/models/types";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl font-semibold">
        Database system app for <span className=" text-[1.3rem]">Alfa 3</span>
      </h1>
    </main>
  );
}
