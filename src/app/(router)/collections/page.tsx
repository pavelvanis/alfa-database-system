import CollectionCard, {
  CollectionCardProps,
} from "@/components/features/collections/collection-card";
import { departmentSchema } from "@/models/department";
import { DoctorSchema } from "@/models/doctor";
import { MedicalWorkspaceSchema } from "@/models/medical-workspace";
import { MedicineSchema } from "@/models/medicine";
import { PatientSchema } from "@/models/patient";
import { PrescriptionSchema } from "@/models/prescription";

const COLLECTIONS = [
  {
    name: "patients",
    description: "Patients description",
    schema: PatientSchema,
  },
  {
    name: "doctors",
    description: "Patients description",
    schema: DoctorSchema,
  },
  {
    name: "departments",
    description: "Patients description",
    schema: departmentSchema,
  },
  {
    name: "medical workspaces",
    description: "Patients description",
    schema: MedicalWorkspaceSchema,
  },
  {
    name: "medicines",
    description: "Patients description",
    schema: MedicineSchema,
  },
  {
    name: "prescriptions",
    description: "Patients description",
    schema: PrescriptionSchema,
  },
];

const getType = (path: any) => {
  if (path.instance) {
    return path.instance;
  } else if (path.caster) {
    return Array.isArray(path.caster.instance) ? "Array" : path.caster.instance;
  } else {
    return "Unknown";
  }
};

// Collections overview
const CollectionsPage = async () => {
  const a = COLLECTIONS.map(({ schema }) => {
    const propertyTypes: Record<string, string> = Object.entries(
      schema.paths
    ).reduce((acc: Record<string, string>, [key, value]: [string, any]) => {
      acc[key] = getType(value);
      return acc;
    }, {});
    return propertyTypes;
  });
  // console.log(a);
  return (
    <div>

      {/* {COLLECTIONS.map(({ ...props }, index) => (
        <CollectionCard key={index} {...props} />
      ))} */}
    </div>
  );
};

export default CollectionsPage;
