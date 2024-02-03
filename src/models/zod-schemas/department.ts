import { z } from "zod";

export const DepartmentSchemaZodOpt = z.object({
  name: z.string().min(2).max(40).optional(),
  specification: z.string().min(2).max(200).optional(),
});

export const DepartmentSchemaZod = z.object({
  name: z.string().min(2).max(40),
  specification: z.string().min(2).max(200),
});
