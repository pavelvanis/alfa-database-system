import { z } from "zod";

const PatientGender = z.enum(["male", "female", "other"]);

const AddressSchemaZodOpt = z.object({
  street: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  zip_code: z.string().optional(),
});

export const PatientSchemaZodOpt = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  birth_date: z.date().optional(),
  born_id: z.string().optional(),
  insurance_number: z.string().optional(),
  gender: PatientGender,
  address: AddressSchemaZodOpt,
});

const AddressSchemaZod = z.object({
  street: z.string(),
  country: z.string(),
  city: z.string(),
  zip_code: z.string(),
});

export const PatientSchemaZod = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.date(),
  born_id: z.string(),
  insurance_number: z.string(),
  gender: PatientGender,
  address: AddressSchemaZod,
});
