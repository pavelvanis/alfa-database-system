import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import PatientModel, {
  IPatient,
  IPatientSchema,
  IPatientSchemaOpt,
} from "@/models/patient";
import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";

// Get patient by id
export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid patient id", 400);

    // Find patient by id
    const patient = await PatientModel.findById(id);
    if (!patient) return errorHandler("Patient not found", 404);

    return NextResponse.json<SuccessResponse<IPatient>>({ items: patient });
  } catch (error) {
    return errorHandler(error);
  }
};
// Delete patient by id
export const DELETE = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid patient id", 400);

    // Delete patient by id
    const deletedPatient = await PatientModel.findByIdAndDelete(id);

    if (!deletedPatient) return errorHandler("Patient not found", 404);
    return NextResponse.json<SuccessResponse<IPatient>>({
      items: deletedPatient,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
// Update patient by id
export const PUT = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const body = (await req.json()) as IPatient;

    // Zod validation
    const validatedBody = zodValidate(IPatientSchemaOpt, body);

    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid patient id", 400);

    // Update patient by id
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      validatedBody,
      {
        new: true,
      }
    );

    if (!updatedPatient) return errorHandler("Patient not found", 404);
    return NextResponse.json<SuccessResponse<IPatient>>({
      items: updatedPatient,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
