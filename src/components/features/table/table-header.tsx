"use client";
import { InboxArrowDownIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";

const PLACEHOLDER = "TableHeader";

export type TableHeaderProps = {
  collection: string;
  data: any[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ collection, data }) => {
  return (
    <div className=" flex justify-between items-center my-7">
      <div className="flex gap-5 items-center">
        <Typography
          placeholder={PLACEHOLDER}
          color="blue-gray"
          variant="h4"
          className="font-semibold uppercase"
        >
          {collection}
        </Typography>
        <Typography placeholder={PLACEHOLDER}>({data.length})</Typography>
      </div>
      <div className="flex gap-3">
        <Button placeholder={PLACEHOLDER} variant="outlined" size="sm" className="flex gap-3 items-center">
          <InboxArrowDownIcon stroke="#000" className="w-5 h-5" />
          Import
        </Button>
        <Button placeholder={PLACEHOLDER} variant="outlined" size="sm" className="flex gap-3 items-center">
          <PrinterIcon stroke="#000" className="w-5 h-5" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default TableHeader;
