import CollectionCard from "@/components/features/collections/collection-card";
import { DoctorModel } from "@/models";

const DOCTOR = {
  name: "Doctors",
  url: "/collection/doctors",
  description: "Doctor Description",
};

const getDoctors = async () => {
  const departments = await DoctorModel.find({}).lean();
  return departments.map((doctor) => ({
    ...doctor,
    _id: doctor._id.toString(),
    department: doctor.department?.toString(),
    medical_workspace: doctor.medical_workspace?.toString(),
  }));
};

const DoctorsParaller = async () => {
  const docs = await getDoctors();
  const props = { ...DOCTOR, data: docs };
  return <CollectionCard {...props} />;
};

export default DoctorsParaller;
