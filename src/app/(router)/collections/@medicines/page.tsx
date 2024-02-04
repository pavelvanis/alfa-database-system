import CollectionCard from "@/components/features/collections/collection-card";
import { MedicineModel } from "@/models";
import React from "react";

const MEDICINE = {
  name: "Medicines",
  url: "/collection/medicines",
  description: "Medicine Description",
};

const getMedicines = async () => {
  const departments = await MedicineModel.find({}).lean();
  return departments.map((medicine) => ({
    ...medicine,
    _id: medicine._id.toString(),
  }));
};

const MedicinesParaller = async () => {
  const meds = await getMedicines();
  const props = { ...MEDICINE, data: meds };
  return <CollectionCard {...props} />;
};

export default MedicinesParaller;
