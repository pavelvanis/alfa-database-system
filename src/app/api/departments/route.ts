import DepartmentModel, {
  IDepartment,
  IDepartmentSchema,
} from "@/models/department";
import { SuccessResponse } from "@/types/api-request";
import { errorHandler } from "@/utils/error-handler";
import zodValidate from "@/utils/zod-validate";
import { NextRequest, NextResponse } from "next/server";

// Get all departments
export const GET = async () => {
  try {
    const departments = await DepartmentModel.find({});
    return NextResponse.json<SuccessResponse<IDepartment[]>>({
      items: departments,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Create new department
export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IDepartment;

    // Add mongo sanitization

    // Zod validation
    const validatedBody = zodValidate(IDepartmentSchema, body);

    const departmentExist = await DepartmentModel.findOne({
      name: validatedBody.name,
    });

    if (departmentExist)
      return errorHandler("Deparment with this name already exists!");

    const department = await DepartmentModel.create(validatedBody);
    return NextResponse.json<SuccessResponse<IDepartment>>({
      items: department,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
