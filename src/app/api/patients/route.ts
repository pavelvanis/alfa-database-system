import { NextRequest, NextResponse } from "next/server";

import PatientModel, {  } from "@/models/patient";
import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";
import { IPatient } from "@/models/types";
import { PatientSchemaZod } from "@/models";

// Get all patients
export const GET = async () => {
  try {
    const patients = await PatientModel.find({});

    return NextResponse.json<SuccessResponse<IPatient[]>>(
      { items: patients },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

// Create new patient
export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IPatient;

    // Add mongo sanitization

    // Zod validation
    const validatedBody = zodValidate(PatientSchemaZod, {
      ...body,
      birth_date: new Date(body.birth_date),
    });

    // Check if patient already exists
    const patientExist = await PatientModel.findOne({
      born_id: validatedBody.born_id,
    });
    if (patientExist)
      return new NextResponse("Patient already exists!", { status: 400 });

    // Create patient
    const patient = await PatientModel.create(validatedBody);

    return NextResponse.json<SuccessResponse<IPatient>>(
      { items: patient },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
