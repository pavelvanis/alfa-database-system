import CollectionCard from "@/components/features/collections/collection-card";
import { MedicalWorkspaceModel } from "@/models";
import React from "react";

const MEDICAL_WORKSPACE = {
  name: "Medical workspaces",
  url: "/collection/medical_workspaces",
  description: "Workspace Description",
};

const getWorkspaces = async () => {
  const departments = await MedicalWorkspaceModel.find({}).lean();
  return departments.map((workspace) => ({
    ...workspace,
    _id: workspace._id.toString(),
  }));
};

const MedicalWorkspacesParaller = async () => {
  const works = await getWorkspaces();
  const props = { ...MEDICAL_WORKSPACE, data: works };
  return <CollectionCard {...props} />;
};

export default MedicalWorkspacesParaller;
