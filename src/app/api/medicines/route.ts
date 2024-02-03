import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";
import MedicineModel, { IMedicine, IMedicineSchema } from "@/models/medicine";

// Get all patients
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

// Create new patient
export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IMedicine;

    // Add mongo sanitization

    // Zod validation
    const validatedBody = zodValidate(IMedicineSchema, body);

    // Check if patient already exists
    const medicineExist = await MedicineModel.findOne({
      name: validatedBody.name,
    });
    if (medicineExist)
      return new NextResponse("Medicine with this name already exists!", {
        status: 400,
      });

    // Create patient
    const medicine = await MedicineModel.create(validatedBody);

    return NextResponse.json<SuccessResponse<IMedicine>>(
      { items: medicine },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
