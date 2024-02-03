import * as z from "zod";
import mongoose, { Document, Model, Schema, Types } from "mongoose";

import DoctorModel from "./doctor";
import PatientModel from "./patient";
import MedicineModel from "./medicine";

const MedicineSchemaZodOpt = z.object({
  medicine_id: z.string(),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(10, "Quantity must be at most 10")
    .default(1)
    .optional(),
});

export const PrescriptionSchemaZodOpt = z.object({
  created_at: z
    .date()
    .default(() => new Date())
    .optional(),
  expires_at: z
    .date()
    .default(() => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))
    .optional(),
  picked_at: z.date().optional(),
  status: z.enum(["active", "expired", "picked"]).default("active").optional(),
  doctor: z.string().optional(),
  patient: z.string().optional(),
  medicines: z.array(MedicineSchemaZodOpt).optional(),
});

const MedicineSchemaZod = z.object({
  medicine_id: z.string(),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(10, "Quantity must be at most 10")
    .default(1),
});

export const PrescriptionSchemaZod = z.object({
  created_at: z.date().default(() => new Date()),
  expires_at: z
    .date()
    .default(() => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)),
  picked_at: z.date().optional(),
  status: z.enum(["active", "expired", "picked"]).default("active"),
  doctor: z.string(),
  patient: z.string(),
  medicines: z.array(MedicineSchemaZod),
});

export interface IPrescription
  extends Omit<z.infer<typeof PrescriptionSchemaZod>, "doctor" | "patient">,
    Document {
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
}

interface IMethods {}

const PrescriptionSchema: Schema = new Schema<IPrescription, {}, IMethods>(
  {
    created_at: {
      type: Date,
      default: Date.now,
      required: [true, "Created at is required"],
    },
    expires_at: {
      type: Date,
      default: () => Date.now() + 1000 * 60 * 60 * 24 * 7,
      required: [true, "Expires at is required"],
    },
    picked_at: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "expired", "picked"],
      required: [true, "Status is required"],
      default: "active",
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: DoctorModel,
      required: [true, "Doctor is required"],
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: PatientModel,
      required: [true, "Patient is required"],
    },
    medicines: [
      {
        medicine_id: {
          type: Schema.Types.ObjectId,
          ref: MedicineModel,
          required: [true, "Medicine is required"],
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity must be at least 1"],
          max: [10, "Quantity must be at most 10"],
        },
      },
    ],
  },
  { timestamps: true }
);

const PrescriptionModel =
  mongoose.models.prescription ||
  mongoose.model("prescription", PrescriptionSchema);

export default PrescriptionModel as Model<IPrescription, {}, IMethods>;
