import mongoose, { Schema, Model } from "mongoose";
import { IMedicalWorkspace } from "./types";

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
  },
  { timestamps: true }
);

const MedicalWorkspaceModel =
  mongoose.models.medical_workspace ||
  mongoose.model<IMedicalWorkspace>(
    "medical_workspace",
    MedicalWorkspaceSchema
  );

export default MedicalWorkspaceModel as Model<IMedicalWorkspace, {}, IMethods>;
