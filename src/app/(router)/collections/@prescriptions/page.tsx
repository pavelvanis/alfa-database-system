import CollectionCard from "@/components/features/collections/collection-card";
import { PrescriptionModel } from "@/models";
import React from "react";

const PRESCRIPTIONS = {
  name: "Prescriptions",
  url: "/collection/prescriptions",
  description: "Prescriptions Description",
};

const getPrescriptions = async () => {
  const departments = await PrescriptionModel.find({}).lean();
  return departments.map((prescription) => ({
    ...prescription,
    _id: prescription._id.toString(),
    patient: prescription.patient.toString(),
    doctor: prescription.doctor.toString(),
    medicines: prescription.medicines.map((medicine) => ({
      ...medicine,
      medicine: medicine.toString(),
      _id: medicine.toString(),
    })),
  }));
};

const PrescriptionsParaller = async () => {
  const presc = await getPrescriptions();
  const props = { ...PRESCRIPTIONS, data: presc };
  return <CollectionCard {...props} />;
};

export default PrescriptionsParaller;
