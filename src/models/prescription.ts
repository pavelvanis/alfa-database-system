import mongoose, { Document, Model, Schema } from "mongoose";
import DoctorModel from "./doctor";
import PatientModel from "./patient";
import MedicineModel from "./medicine";

type PrescriptionStatus = "active" | "expired" | "picked";

export interface IPrescription extends Document {
  created_at?: Date;
  expires_at?: Date;
  picked_at?: Date;
  status: PrescriptionStatus;
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  medicines: {
    medicine_id: mongoose.Types.ObjectId;
    quantity: number;
  }[];
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
