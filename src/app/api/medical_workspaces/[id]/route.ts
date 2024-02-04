import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";
import { MedicalWorkspaceModel, MedicalWorkspaceSchemaZodOpt } from "@/models";
import { IMedicalWorkspace } from "@/models/types";

// Get medical workspace by id
export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id)) return errorHandler("Invalid patient id", 400);

    // Find workspace by id
    const workspace = await MedicalWorkspaceModel.findById(id);
    if (!workspace) return errorHandler("Patient not found", 404);

    return NextResponse.json<SuccessResponse<IMedicalWorkspace>>({
      items: workspace,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Update medical workspace by id
export const PUT = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const body = (await req.json()) as IMedicalWorkspace;

    // Zod validation
    const validatedBody = zodValidate(MedicalWorkspaceSchemaZodOpt, body);

    // Check valid id
    if (!isValidObjectId(id))
      return errorHandler("Invalid medical-workspace id", 400);

    // Update workspace by id
    const updatedWorkspace = await MedicalWorkspaceModel.findByIdAndUpdate(
      id,
      validatedBody,
      {
        new: true,
      }
    );

    if (!updatedWorkspace)
      return errorHandler("Medical workspace not found", 404);
    return NextResponse.json<SuccessResponse<IMedicalWorkspace>>({
      items: updatedWorkspace,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Delete medical workspace by id
export const DELETE = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    // Check valid id
    if (!isValidObjectId(id))
      return errorHandler("Invalid medical-workspace id", 400);

    // Delete workspace by id
    const deletedWorkspace = await MedicalWorkspaceModel.findByIdAndDelete(id);

    if (!deletedWorkspace)
      return errorHandler("Medical workspace not found", 404);
    return NextResponse.json<SuccessResponse<IMedicalWorkspace>>({
      items: deletedWorkspace,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
