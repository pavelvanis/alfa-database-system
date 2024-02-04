import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";

import { DoctorModel } from "@/models";
import { IDoctor } from "@/models/types";
import { DoctorSchemaZodOpt } from "@/models/zod-schemas";

// Get doctor by id
export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid doctor id", 400);

    // Find doctor by id
    const doctor = await DoctorModel.findById(id);
    if (!doctor) return errorHandler("Doctor not found", 404);

    return NextResponse.json<SuccessResponse<IDoctor>>({
      items: doctor,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Update doctor by id
export const PUT = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const body = (await req.json()) as IDoctor;

    // Zod validation
    const validatedBody = zodValidate(DoctorSchemaZodOpt, body);

    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid doctor id", 400);

    // Update doctor by id
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(
      id,
      validatedBody,
      {
        new: true,
      }
    );

    if (!updatedDoctor) return errorHandler("Doctor not found", 404);
    return NextResponse.json<SuccessResponse<IDoctor>>({
      items: updatedDoctor,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Delete doctor by id
export const DELETE = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid doctor id", 400);

    // Delete doctor by id
    const deletedDoctor = await DoctorModel.findByIdAndDelete(id);
    if (!deletedDoctor) return errorHandler("Doctor not found", 404);

    return NextResponse.json<SuccessResponse<IDoctor>>({
      items: deletedDoctor,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
