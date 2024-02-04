import TesterConatiner from "@/components/features/tester/tester-container";
import { PrescriptionModel } from "@/models";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import React from "react";

const getPrescriptions = async () => {
  const prescriptions = await PrescriptionModel.find({});
  console.log("PRESCRIPTIONS: ", prescriptions);
};

const Page = () => {
  getPrescriptions()
  return (
    <div className=" flex flex-col h-full ">
      <TesterConatiner />
    </div>
  );
};

export default Page;
