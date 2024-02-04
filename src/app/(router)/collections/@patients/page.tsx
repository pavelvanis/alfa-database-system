import CollectionCard from "@/components/features/collections/collection-card";
import { PatientModel } from "@/models";
import React from "react";

const PATIENT = {
  name: "Patients",
  url: "/collection/patients",
  description: "Patient Description",
};

const getPatients = async () => {
  const departments = await PatientModel.find({}).lean();
  return departments.map((patient) => ({
    ...patient,
    _id: patient._id.toString(),
  }));
};

const PatientsParaller = async () => {
  const pat = await getPatients();
  const props = { ...PATIENT, data: pat };
  return <CollectionCard {...props} />;
};

export default PatientsParaller;
