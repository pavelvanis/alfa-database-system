"use client";
import { Card } from "@material-tailwind/react";
import React from "react";
import TesterHeader from "./tester-header";
import TesterData from "./tester-data";
import { Prescription } from "@/models/types/prescription";

const PLACEHOLDER = "Placeholder";

type Data = {
  prescriptions?: Prescription[];
};

const TesterConatiner = ({ prescriptions }: Data) => {
  return (
    <Card placeholder={PLACEHOLDER}>
      <TesterHeader />
      <TesterData />
    </Card>
  );
};

export default TesterConatiner;
