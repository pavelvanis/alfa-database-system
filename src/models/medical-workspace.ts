import * as z from "zod";
import mongoose, { Schema, Document, Model } from "mongoose";

import DoctorModel from "./doctor";
import DepartmentModel from "./department";

export const IMedicalWorkspaceSchemaOpt = z.object({
  address: z
    .object({
      street: z
        .string()
        .min(1, "Street must be at least 1 characters long")
        .max(46, "Street must be at most 46 characters long")
        .optional(),
      country: z
        .string()
        .min(1, "Country must be at least 1 characters long")
        .max(20, "Country must be at most 20 characters long")
        .optional(),
      city: z
        .string()
        .min(1, "City must be at least 1 characters long")
        .max(20, "City must be at most 20 characters long")
        .optional(),
      zip_code: z
        .string()
        .min(1, "Zip code must be at least 1 characters long")
        .max(10, "Zip code must be at most 10 characters long")
        .optional(),
    })
    .optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(36, "Name must be at most 36 characters long")
    .optional(),
  doctors: z.array(z.string()).optional(),
  departments: z.array(z.string()).optional(),
});

export const IMedicalWorkspaceSchema = z.object({
  address: z.object({
    street: z
      .string()
      .min(1, "Street must be at least 1 characters long")
      .max(46, "Street must be at most 46 characters long"),
    country: z
      .string()
      .min(1, "Country must be at least 1 characters long")
      .max(20, "Country must be at most 20 characters long"),
    city: z
      .string()
      .min(1, "City must be at least 1 characters long")
      .max(20, "City must be at most 20 characters long"),
    zip_code: z
      .string()
      .min(1, "Zip code must be at least 1 characters long")
      .max(10, "Zip code must be at most 10 characters long"),
  }),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(36, "Name must be at most 36 characters long"),
  doctors: z.array(z.string()),
  departments: z.array(z.string()),
});

export interface IMedicalWorkspace
  extends z.infer<typeof IMedicalWorkspaceSchema>,
    Document {}

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

const MedicalWorkspaceModel =
  mongoose.models.medical_workspace ||
  mongoose.model<IMedicalWorkspace>(
    "medical_workspace",
    MedicalWorkspaceSchema
  );

export default MedicalWorkspaceModel as Model<IMedicalWorkspace, {}, IMethods>;
