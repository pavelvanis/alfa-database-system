import * as z from "zod";
import mongoose, { Schema, Document, Model } from "mongoose";

export const IDepartmentSchemaOpt = z.object({
  name: z.string().min(2).max(40).optional(),
  specification: z.string().min(2).max(200).optional(),
});

export const IDepartmentSchema = z.object({
  name: z.string().min(2).max(40),
  specification: z.string().min(2).max(200),
});

export interface IDepartment
  extends z.infer<typeof IDepartmentSchema>,
    Document {}

interface IMethods {}

const departmentSchema = new Schema<IDepartment, {}, IMethods>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [40, "Name must be at most 40 characters long"],
    },
    specification: {
      type: String,
      required: [true, "Specification is required"],
      minlength: [2, "Specification must be at least 2 characters long"],
      maxlength: [200, "Specification must be at most 200 characters long"],
    },
  },
  { timestamps: true }
);

const DepartmentModel =
  mongoose.models.department || mongoose.model("department", departmentSchema);

export default DepartmentModel as Model<IDepartment, {}, IMethods>;
