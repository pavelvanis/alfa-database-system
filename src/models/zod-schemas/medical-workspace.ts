import { z } from "zod";

export const MedicalWorkspaceSchemaZodOpt = z.object({
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
});

export const MedicalWorkspaceSchemaZod = z.object({
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
});
