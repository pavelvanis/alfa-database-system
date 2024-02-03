import { z } from "zod";

export const DoctorSchemaZodOpt = z.object({
  first_name: z
    .string()
    .min(1, "First name must be at least 1 characters long")
    .max(36, "First name must be at most 236 characters long")
    .optional(),
  last_name: z
    .string()
    .min(1, "Last name must be at least 1 characters long")
    .max(36, "Last name must be at most 236 characters long")
    .optional(),
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Invalid phone number"
    )
    .optional(),
  email: z.string().email("Invalid email").optional(),
  identification_number: z.string().optional(),
  medical_workspace: z.string().optional(),
  department: z.string().optional(),
});
export const DoctorSchemaZod = z.object({
  first_name: z
    .string()
    .min(1, "First name must be at least 1 characters long")
    .max(36, "First name must be at most 236 characters long"),
  last_name: z
    .string()
    .min(1, "Last name must be at least 1 characters long")
    .max(36, "Last name must be at most 236 characters long"),
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Invalid phone number"
    )
    .optional(),
  email: z.string().email("Invalid email").optional(),
  identification_number: z.string(),
  medical_workspace: z.string().optional(),
  department: z.string().optional(),
});
