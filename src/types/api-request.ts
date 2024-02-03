import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export type SuccessResponse<T> = {
  message: T;
};

export interface ErrorResponse<T> {
  error: T;
}
