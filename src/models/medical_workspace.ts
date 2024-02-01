import mongoose, { Schema, Document, Model } from "mongoose";
import DoctorModel from "./doctor";
import DepartmentModel from "./department";

interface IMedicalWorkspace extends Document {
  address: {
    street: string;
    country: string;
    city: string;
    zip_code: string;
  };
  name: string;
  doctors: Schema.Types.ObjectId[];
  departments: Schema.Types.ObjectId[];
}

interface IMethods {}

const MedicalWorkspaceSchema: Schema = new Schema<
  IMedicalWorkspace,
  {},
  IMethods
>(
  {
    address: {
      street: {
        type: String,
        required: [true, "Street is required"],
        minlength: [1, "Street must be at least 1 characters long"],
        maxlength: [46, "Street must be at most 46 characters long"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
        minlength: [1, "Country must be at least 1 characters long"],
        maxlength: [20, "Country must be at most 20 characters long"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
        minlength: [1, "City must be at least 1 characters long"],
        maxlength: [20, "City must be at most 20 characters long"],
      },
      zip_code: {
        type: String,
        required: [true, "Zip code is required"],
        minlength: [1, "Zip code must be at least 1 characters long"],
        maxlength: [10, "Zip code must be at most 10 characters long"],
      },
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [36, "Name must be at most 36 characters long"],
    },
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: DoctorModel,
        required: false,
      },
    ],
    departments: [
      {
        type: Schema.Types.ObjectId,
        ref: DepartmentModel,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const MedicalWorkspace =
  mongoose.models.medical_workspace ||
  mongoose.model<IMedicalWorkspace>(
    "medical_workspace",
    MedicalWorkspaceSchema
  );

export default MedicalWorkspace as Model<IMedicalWorkspace, {}, IMethods>;
