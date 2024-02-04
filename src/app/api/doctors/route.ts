import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";
import DoctorModel from "@/models/doctor";
import { DepartmentModel, MedicalWorkspaceModel } from "@/models";
import { IDoctor } from "@/models/types";
import { DoctorSchemaZod } from "@/models/zod-schemas/doctor";
import { Doctor } from "@/models/types/doctor";

// Get all doctors
export const GET = async () => {
  try {
    const doctors = (await DoctorModel.find({})
      .populate("department")
      .populate("medical_workspace")) as Doctor[];

    console.log("GET:", doctors);

    return NextResponse.json<Doctor[]>(doctors);
  } catch (error) {
    return errorHandler(error);
  }
};

// Create new doctor
export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IDoctor;

    // Add mongo sanitization

    // Zod validation
    const validatedBody = zodValidate(DoctorSchemaZod, body) as IDoctor;

    const workspaceExist = await MedicalWorkspaceModel.findById(
      validatedBody.medical_workspace
    );
    if (!workspaceExist) return errorHandler("Workspace not found!", 404);
    const departmentExist = await DepartmentModel.findById(
      validatedBody.department
    );
    if (!departmentExist) return errorHandler("Department not found!", 404);

    // Check if doctor already exists
    const doctorExist = await DoctorModel.findOne({
      identification_number: validatedBody.identification_number,
    });
    if (doctorExist)
      return new NextResponse("Doctor with identificator already exists!", {
        status: 400,
      });

    // Create doctor
    const createdDoctor = await DoctorModel.create(validatedBody);

    const doctor = (await DoctorModel.findById(createdDoctor._id)
      .populate("department")
      .populate("medical_workspace")) as Doctor;

    return NextResponse.json<Doctor>(doctor);
  } catch (error) {
    return errorHandler(error);
  }
};
