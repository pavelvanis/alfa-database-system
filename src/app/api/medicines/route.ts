import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";
import MedicineModel from "@/models/medicine";
import { IMedicine } from "@/models/types";
import { MedicineSchemaZod } from "@/models";

// Get all medicines
export const GET = async () => {
  try {
    const medicines = await MedicineModel.find({});

    return NextResponse.json<SuccessResponse<IMedicine[]>>(
      { items: medicines },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

// Create new medicine
export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IMedicine;

    // Add mongo sanitization

    // Zod validation
    const validatedBody = zodValidate(MedicineSchemaZod, body);

    // Check if medicine already exists
    const medicineExist = await MedicineModel.findOne({
      name: validatedBody.name,
    });
    if (medicineExist)
      return new NextResponse("Medicine with this name already exists!", {
        status: 400,
      });

    // Create medicine
    const medicine = await MedicineModel.create(validatedBody);

    return NextResponse.json<SuccessResponse<IMedicine>>(
      { items: medicine },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
