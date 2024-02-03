import PatientModel, { IPatient } from "@/models/patient";
import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const patients = await PatientModel.find({});

    return NextResponse.json<SuccessResponse<IPatient[]>>(
      { message: patients },
      { status: 200 }
    );
  } catch (error) {
    errorHandler(error);
  }
};
