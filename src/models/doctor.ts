import mongoose, { Schema, Model } from "mongoose";

import MedicalWorkspaceModel from "./medical-workspace";
import DepartmentModel from "./department";
import { IDoctor } from "./types";

interface IMethods {}

const DoctorSchema = new Schema<IDoctor, {}, IMethods>(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      minlength: [1, "First name must be at least 1 characters long"],
      maxlength: [36, "First name must be at most 236 characters long"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [1, "Last name must be at least 1 characters long"],
      maxlength: [36, "Last name must be at most 236 characters long"],
    },
    phone: {
      type: String,
      unique: true,
      required: false,
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Invalid phone number",
      ],
    },
    email: {
      type: String,
      unique: true,
      required: false,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"],
    },
    // Should be validateed with some pattern
    identification_number: {
      type: String,
      unique: true,
      required: [true, "Identification number is required"],
    },
    medical_workspace: {
      type: Schema.Types.ObjectId,
      ref: MedicalWorkspaceModel,
      required: false,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: DepartmentModel,
      required: false,
    },
  },
  { timestamps: true }
);

const DoctorModel =
  mongoose.models.doctor || mongoose.model("doctor", DoctorSchema);

export default DoctorModel as Model<IDoctor, {}, IMethods>;
