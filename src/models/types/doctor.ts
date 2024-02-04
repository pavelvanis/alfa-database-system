import { IDoctor } from ".";
import { IDepartment, IMedicalWorkspace } from "..";

export type Doctor = Omit<IDoctor, "department" | "medical_workspace"> & {
  department: IDepartment;
  medical_workspace: IMedicalWorkspace;
};
