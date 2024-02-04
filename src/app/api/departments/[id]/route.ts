import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";

import DepartmentModel from "@/models/department";
import { IDepartment } from "@/models/types";
import { DepartmentSchemaZodOpt } from "@/models/zod-schemas";

// Get department by id
export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid department id", 400);

    // Find department by id
    const department = await DepartmentModel.findById(id);
    if (!department) return errorHandler("Department not found", 404);

    return NextResponse.json<SuccessResponse<IDepartment>>({
      items: department,
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
    const body = (await req.json()) as IDepartment;

    // Zod validation
    const validatedBody = zodValidate(DepartmentSchemaZodOpt, body);

    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid department id", 400);

    // Update department by id
    const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
      id,
      validatedBody,
      {
        new: true,
      }
    );

    if (!updatedDepartment) return errorHandler("Department not found", 404);
    return NextResponse.json<SuccessResponse<IDepartment>>({
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
    if (!isValidObjectId(id)) return errorHandler("Invalid department id", 400);

    // Delete department by id
    const deletedDepartment = await DepartmentModel.findByIdAndDelete(id);
    if (!deletedDepartment) return errorHandler("Department not found", 404);

    return NextResponse.json<SuccessResponse<IDepartment>>({
      items: deletedDepartment,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
