import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";

import { PrescriptionModel, PrescriptionSchemaZodOpt } from "@/models";
import { IPrescription } from "@/models/types";

// Get prescription by id
export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id))
      return errorHandler("Invalid prescription id", 400);

    // Find prescription by id
    const prescription = await PrescriptionModel.findById(id);
    if (!prescription) return errorHandler("Prescription not found", 404);

    return NextResponse.json<SuccessResponse<IPrescription>>({
      items: prescription,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Update prescription by id
export const PUT = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const body = (await req.json()) as IPrescription;

    // Zod validation
    const validatedBody = zodValidate(PrescriptionSchemaZodOpt, body);

    // Check valid id
    if (!isValidObjectId(id))
      return errorHandler("Invalid prescription id", 400);

    // Update prescription by id
    const updatedPrescription = await PrescriptionModel.findByIdAndUpdate(
      id,
      validatedBody,
      {
        new: true,
      }
    );

    if (!updatedPrescription)
      return errorHandler("Prescription not found", 404);
    return NextResponse.json<SuccessResponse<IPrescription>>({
      items: updatedPrescription,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Delete prescription by id
export const DELETE = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id))
      return errorHandler("Invalid prescription id", 400);

    // Delete prescription by id
    const deletedPrescription = await PrescriptionModel.findByIdAndDelete(id);

    if (!deletedPrescription)
      return errorHandler("Prescription not found", 404);
    return NextResponse.json<SuccessResponse<IPrescription>>({
      items: deletedPrescription,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
