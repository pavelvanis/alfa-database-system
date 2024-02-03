import { NextResponse } from "next/server";

export const errorHandler = (error: any) => {
  return (error: any) => {
    return new NextResponse("Something went wrong", { status: 500 });
  };
};
