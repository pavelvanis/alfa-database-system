import { z } from "zod";

export const MedicineSchemaZodOpt = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 characters long")
    .max(64, "Name must be at most 64 characters long")
    .optional(),
  description: z
    .string()
    .min(16, "Description must be at least 16 characters long")
    .max(256, "Description must be at most 256 characters long")
    .optional(),
  dosage: z
    .string()
    .min(4, "Dosage must be at least 4 characters long")
    .max(256, "Dosage must be at most 256 characters long")
    .optional(),
  prescription_required: z.boolean().optional(),
  side_effects: z
    .array(
      z
        .string()
        .min(4, "Each side effect must be between 4 and 256 characters long")
        .max(256, "Each side effect must be between 4 and 256 characters long")
    )
    .optional(),
});

export const MedicineSchemaZod = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 characters long")
    .max(64, "Name must be at most 64 characters long"),
  description: z
    .string()
    .min(16, "Description must be at least 16 characters long")
    .max(256, "Description must be at most 256 characters long"),
  dosage: z
    .string()
    .min(4, "Dosage must be at least 4 characters long")
    .max(256, "Dosage must be at most 256 characters long"),
  prescription_required: z.boolean(),
  side_effects: z.array(
    z
      .string()
      .min(4, "Each side effect must be between 4 and 256 characters long")
      .max(256, "Each side effect must be between 4 and 256 characters long")
  ),
});
