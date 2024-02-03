import { NextRequest, NextResponse } from "next/server";

import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";
import DoctorModel, { IDoctor, DoctorSchemaZod } from "@/models/doctor";

// Get all doctors
export const GET = async () => {
  try {
    const doctors = await DoctorModel.find({});

    return NextResponse.json<SuccessResponse<IDoctor[]>>(
      { items: doctors },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

// Create new doctor
// export const POST = async (req: NextRequest) => {
//   try {
//     const body = (await req.json()) as IDoctor;

//     // Add mongo sanitization

//     // Zod validation
//     const validatedBody = zodValidate(IDoctorSchema, body);

//     // Check if patient already exists
//     const doctorExist = await DoctorModel.findOne({
//       identification_number: validatedBody.identification_number,
//     });
//     if (doctorExist)
//       return new NextResponse("Doctor with identificator already exists!", {
//         status: 400,
//       });

//     // Create doctor
//     const doctor = await DoctorModel.create(validatedBody);

//     return NextResponse.json<SuccessResponse<IDoctor>>(
//       { items: doctor },
//       { status: 200 }
//     );
//   } catch (error) {
//     return errorHandler(error);
//   }
// };
