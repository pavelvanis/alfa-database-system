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
import { IPrescription, Prescription } from "@/models/types";

// Get all prescriptions
export const GET = async () => {
  try {
    const prescriptions = (await PrescriptionModel.find({})
      .populate("doctor")
      .populate("patient")
      .populate("medicines.medicine")) as Prescription[];

    return NextResponse.json<Prescription[]>(prescriptions);
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

    const doctorExist = await DoctorModel.findById(validatedBody.doctor);
    if (!doctorExist) return errorHandler("Doctor not found!", 404);

    const patientExist = await PatientModel.findById(validatedBody.patient);
    if (!patientExist) return errorHandler("Patient not found!", 404);

    // Check if medicines exist
    validatedBody.medicines.forEach(async (medicine) => {
      const medicineExist = await MedicineModel.findById(medicine.medicine);
      if (!medicineExist) return errorHandler("Medicine not found!", 404);
    });

    // Create prescription
    const createdPrescription = await PrescriptionModel.create(validatedBody);

    const prescription = (await PrescriptionModel.findById(createdPrescription._id)
      .populate("doctor")
      .populate("patient")
      .populate("medicines.medicine")) as Prescription;

    return NextResponse.json<Prescription>(prescription);
  } catch (error) {
    return errorHandler(error);
  }
};
