import { Document, Types } from "mongoose";
import { z } from "zod";

import { DepartmentSchemaZod } from "../zod-schemas/department";
import { MedicalWorkspaceSchemaZod } from "../zod-schemas/medical-workspace";
import { MedicineSchemaZod } from "../zod-schemas/medicine";
import { PatientSchemaZod } from "../zod-schemas/patient";
import { PrescriptionSchemaZod } from "../zod-schemas/prescription";
import { DoctorSchemaZod } from "../zod-schemas/doctor";

export interface IDepartment
  extends z.infer<typeof DepartmentSchemaZod>,
    Document {}

export interface IMedicalWorkspace
  extends z.infer<typeof MedicalWorkspaceSchemaZod>,
    Document {}

export interface IMedicine
  extends z.infer<typeof MedicineSchemaZod>,
    Document {}

export interface IPatient extends z.infer<typeof PatientSchemaZod>, Document {}

export interface IPrescription
  extends Omit<z.infer<typeof PrescriptionSchemaZod>, "doctor" | "patient">,
    Document {
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
}

export interface IDoctor extends z.infer<typeof DoctorSchemaZod>, Document {}
