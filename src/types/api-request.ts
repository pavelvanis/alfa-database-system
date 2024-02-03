import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export type SuccessResponse<T> = {
  items: T;
};

export interface ErrorResponse<T> {
  error: T;
}
