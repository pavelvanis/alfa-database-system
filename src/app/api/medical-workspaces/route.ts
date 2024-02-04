import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";

import { MedicalWorkspaceModel, MedicalWorkspaceSchemaZod } from "@/models";
import { IMedicalWorkspace } from "@/models/types";

// Get all medical workspaces
export const GET = async () => {
  try {
    const workspaces = await MedicalWorkspaceModel.find({});

    return NextResponse.json<SuccessResponse<IMedicalWorkspace[]>>(
      { items: workspaces },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

// Create new medical workspace
export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IMedicalWorkspace;

    // Add mongo sanitization

    // Zod validation
    const validatedBody = zodValidate(MedicalWorkspaceSchemaZod, body);

    // Check if workspace already exists
    const workspaceExist = await MedicalWorkspaceModel.findOne({
      name: validatedBody.name,
    });
    if (workspaceExist)
      return new NextResponse("Workspace with this name already exists!", {
        status: 400,
      });

    // Create medical workspace
    const workspace = await MedicalWorkspaceModel.create(validatedBody);

    return NextResponse.json<SuccessResponse<IMedicalWorkspace>>(
      { items: workspace },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
