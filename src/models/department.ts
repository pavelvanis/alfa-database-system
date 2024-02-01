import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  specification: string;
}

interface IMethods {}

const departmentSchema = new Schema<IDepartment, {}, IMethods>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [36, "Name must be at most 36 characters long"],
    },
    specification: {
      type: String,
      unique: true,
      required: [true, "Specification is required"],
      minlength: [2, "Specification must be at least 2 characters long"],
      maxlength: [36, "Specification must be at most 36 characters long"],
    },
  },
  { timestamps: true }
);

const DepartmentModel =
  mongoose.models.department || mongoose.model("department", departmentSchema);

export default DepartmentModel as Model<IDepartment, {}, IMethods>;
