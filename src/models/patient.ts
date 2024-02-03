import mongoose, { Document, Model, Schema } from "mongoose";
import * as z from "zod";

const PatientGender = z.enum(["male", "female", "other"]);

const PatientAddressSchemaOpt = z.object({
  street: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  zip_code: z.string().optional(),
});

export const IPatientSchemaOpt = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  birth_date: z.date().optional(),
  born_id: z.string().optional(),
  insurance_number: z.string().optional(),
  gender: PatientGender,
  address: PatientAddressSchemaOpt,
});

const PatientAddressSchema = z.object({
  street: z.string(),
  country: z.string(),
  city: z.string(),
  zip_code: z.string(),
});

export const IPatientSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.date(),
  born_id: z.string(),
  insurance_number: z.string(),
  gender: PatientGender,
  address: PatientAddressSchema,
});

export interface IPatient extends z.infer<typeof IPatientSchema>, Document {}

interface IMethods {}

const PatientSchema = new Schema<IPatient, {}, IMethods>(
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
    birth_date: {
      type: Date,
      required: [true, "Birth date is required"],
    },
    // Should be validateed with some pattern
    born_id: {
      unique: true,
      type: String,
      required: [true, "Born ID is required"],
      minlength: [5, "Born ID must be at least 10 characters long"],
      maxlength: [30, "Born ID must be at most 10 characters long"],
    },
    // Should be validateed with some pattern
    insurance_number: {
      unique: true,
      type: String,
      required: [true, "Insurance number is required"],
      minlength: [5, "Insurance number must be at least 10 characters long"],
      maxlength: [30, "Insurance number must be at most 10 characters long"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
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
  },
  { timestamps: true }
);

const PatientModel =
  mongoose.models.patient || mongoose.model("patient", PatientSchema);

export default PatientModel as Model<IPatient, {}, IMethods>;
