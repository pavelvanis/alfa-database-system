import { Schema, Model, models, model } from "mongoose";
import { IDepartment } from "./types";

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
  models.department || model("department", departmentSchema);

export default DepartmentModel as Model<IDepartment, {}, IMethods>;
