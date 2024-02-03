import { NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";

const zodValidate = (schema: ZodSchema, data: unknown) => {
  const parsed = schema.parse(data);

  return parsed;
};
export default zodValidate;

export const handleZodError = (error: any) => {
  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return NextResponse.json(
      {
        type: "ValidationError",
        errors,
      },
      { status: 400 }
    );
  }
};
