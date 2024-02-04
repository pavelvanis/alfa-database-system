import CollectionCard from "@/components/features/collections/collection-card";
import { DepartmentModel } from "@/models";
import React from "react";

const DEPARTMENT = {
  name: "Departments",
  url: "/collection/departments",
  description: "Department Description",
};

const getDepartments = async () => {
  const departments = await DepartmentModel.find({}).lean();
  return departments.map((department) => ({
    ...department,
    _id: department._id.toString(),
  }));
};

const DepartmentsParaller = async () => {
  const dep = await getDepartments();
  const props = { ...DEPARTMENT, data: dep };
  return <CollectionCard {...props} />;
};

export default DepartmentsParaller;
