"use client";
import { Typography } from "@material-tailwind/react";
import React from "react";

export type TableBodyProps = {
  collection: string;
  data: any[];
};

const PLACEHOLDER = "TableBody";

const TableBody: React.FC<TableBodyProps> = ({ collection, data }) => {
  const columns = ["#"].concat(Object.keys(data[0]));
  return (
    <div className=" rounded-xl overflow-x-auto h-full">
      <table className=" table-auto">
        <thead className="p-1">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  placeholder={PLACEHOLDER}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {column}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-3">{index + 1}</td>
              {Object.values(row).map((value, index) => (
                <td className="p-3" key={index}>
                  {typeof value === "string"
                    ? value
                    : typeof value === "object" && value !== null
                    ? (value as { name?: string }).name
                      ? (value as { name?: string }).name
                      : JSON.stringify(value, null, 2)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBody;
