import { IDoctor, IMedicine, IPatient, IPrescription } from ".";

export type Prescription = Omit<
  IPrescription,
  "doctor" | "patient" | "medicines"
> & {
  doctor: IDoctor;
  patient: IPatient;
  medicines: {
    medicine: IMedicine;
    quantity: number;
  }[];
};
