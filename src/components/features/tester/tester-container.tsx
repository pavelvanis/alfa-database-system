"use client";
import { Card } from "@material-tailwind/react";
import React from "react";
import TesterHeader from "./tester-header";
import TesterData from "./tester-data";

const PLACEHOLDER = "Placeholder";

const TesterConatiner = () => {
  return (
    <Card placeholder={PLACEHOLDER}>
      <TesterHeader />
      <TesterData />
    </Card>
  );
};

export default TesterConatiner;
