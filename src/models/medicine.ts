import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMedicine extends Document {
  name: string;
  description: string;
  dosage: string;
  prescription_required: boolean;
  side_effects: string[];
}

interface IMethods {}

const MedicineSchema = new Schema<IMedicine, {}, IMethods>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      minlength: [1, "Name must be at least 1 characters long"],
      maxlength: [64, "Name must be at most 64 characters long"],
    },
    description: {
      type: String,
      minlength: [16, "Description must be at least 16 characters long"],
      maxlength: [256, "Description must be at most 256 characters long"],
    },
    dosage: {
      type: String,
      required: [true, "Dosage is required"],
      minlength: [4, "Dosage must be at least 4 characters long"],
      maxlength: [256, "Dosage must be at most 256 characters long"],
    },
    prescription_required: {
      type: Boolean,
      required: [true, "Prescription required is required"],
    },
    side_effects: {
      type: [String],
      required: [true, "Side effects is required"],
      validate: {
        validator: (arr: string[]) => {
          return arr.every(
            (effect) => effect.length >= 4 && effect.length <= 256
          );
        },
        message: "Each side effect must be between 4 and 256 characters long",
      },
    },
  },
  { timestamps: true }
);

const MedicineModel =
  mongoose.models.user || mongoose.model("medicine", MedicineSchema);

export default MedicineModel as Model<IMedicine, {}, IMethods>;
