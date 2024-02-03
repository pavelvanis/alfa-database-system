import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { handleZodError } from "./zod-validate";

const DEFAULT_ERROR_RESPONSE = (error: any, status?: number) => {
  return NextResponse.json(
    {
      type: "Error",
      errors: [error.message || error || "Internal server error"],
    },
    { status: status || 500 }
  );
};

export const errorHandler = (error: any, status?: number) => {
  console.error(error);
  const zodError = handleZodError(error);
  return zodError || DEFAULT_ERROR_RESPONSE(error, status);
};
