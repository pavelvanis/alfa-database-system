import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";

import {
  DoctorModel,
  MedicineModel,
  PatientModel,
  PrescriptionModel,
  PrescriptionSchemaZod,
} from "@/models";
import { IPrescription } from "@/models/types";

// Get all prescriptions
export const GET = async () => {
  try {
    const prescriptions = await PrescriptionModel.find({});

    return NextResponse.json<SuccessResponse<IPrescription[]>>(
      { items: prescriptions },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

// Create new prescription
export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IPrescription;

    // Add mongo sanitization

    // Zod validation
    const validatedBody: IPrescription = zodValidate(PrescriptionSchemaZod, {
      ...body,
      expires_at: new Date(body.expires_at),
      picked_at: body.picked_at ? new Date(body.picked_at) : undefined,
    });

    // Check if prescription already exists
    const prescriptionExist = await PrescriptionModel.findOne({});
    if (prescriptionExist)
      return new NextResponse("Prescription already exists!", { status: 400 });

    const doctorExist = await DoctorModel.findById(validatedBody.doctor);
    if (!doctorExist) return errorHandler("Doctor not found!", 404);

    const patientExist = await PatientModel.findById(validatedBody.patient);
    if (!patientExist) return errorHandler("Patient not found!", 404);

    // Check if medicines exist
    validatedBody.medicines.forEach(async (medicine) => {
      const medicineExist = await MedicineModel.findById(medicine.medicine_id);
      if (!medicineExist) return errorHandler("Medicine not found!", 404);
    });

    // Create prescription
    const prescription = await PrescriptionModel.create(validatedBody);

    return NextResponse.json<SuccessResponse<IPrescription>>({
      items: prescription,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
