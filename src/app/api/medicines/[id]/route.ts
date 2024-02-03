import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import MedicineModel, {
  IMedicine,
  IMedicineSchemaOpt,
} from "@/models/medicine";
import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";

// Get department by id
export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid medicine id", 400);

    // Find department by id
    const medicine = await MedicineModel.findById(id);
    if (!medicine) return errorHandler("Medicine not found", 404);

    return NextResponse.json<SuccessResponse<IMedicine>>({
      items: medicine,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Update department by id
export const PUT = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const body = (await req.json()) as IMedicine;

    // Zod validation
    const validatedBody = zodValidate(IMedicineSchemaOpt, body);

    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid department id", 400);

    // Update department by id
    const updatedDepartment = await MedicineModel.findByIdAndUpdate(
      id,
      validatedBody,
      {
        new: true,
      }
    );

    if (!updatedDepartment) return errorHandler("Department not found", 404);
    return NextResponse.json<SuccessResponse<IMedicine>>({
      items: updatedDepartment,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Delete department by id
export const DELETE = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid medicine id", 400);

    // Delete department by id
    const deletedMedicine = await MedicineModel.findByIdAndDelete(id);
    if (!deletedMedicine) return errorHandler("Medicine not found", 404);

    return NextResponse.json<SuccessResponse<IMedicine>>({
      items: deletedMedicine,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
