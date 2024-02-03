import { z } from "zod";

const MedicineSchemaZodOpt = z.object({
  medicine_id: z.string(),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(10, "Quantity must be at most 10")
    .default(1)
    .optional(),
});

export const PrescriptionSchemaZodOpt = z.object({
  created_at: z
    .date()
    .default(() => new Date())
    .optional(),
  expires_at: z
    .date()
    .default(() => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))
    .optional(),
  picked_at: z.date().optional(),
  status: z.enum(["active", "expired", "picked"]).default("active").optional(),
  doctor: z.string().optional(),
  patient: z.string().optional(),
  medicines: z.array(MedicineSchemaZodOpt).optional(),
});

const MedicineSchemaZod = z.object({
  medicine_id: z.string(),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(10, "Quantity must be at most 10")
    .default(1),
});

export const PrescriptionSchemaZod = z.object({
  created_at: z.date().default(() => new Date()),
  expires_at: z
    .date()
    .default(() => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)),
  picked_at: z.date().optional(),
  status: z.enum(["active", "expired", "picked"]).default("active"),
  doctor: z.string(),
  patient: z.string(),
  medicines: z.array(MedicineSchemaZod),
});
