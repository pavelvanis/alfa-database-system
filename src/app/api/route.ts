import { SuccessResponse, ErrorResponse } from "@/types/api-request";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const state =
      mongoose.connection.readyState == 1 ? "connected" : "disconnected";

    return NextResponse.json({ message: state }, { status: 200 });
  } catch (error) {
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
};
