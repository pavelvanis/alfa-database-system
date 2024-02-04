"use client";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { twMerge } from "tailwind-merge";

export type TableBodyProps = {
  collection: string;
  data: any[];
};

const even = (n: number) => n % 2 === 0;

const PLACEHOLDER = "TableBody";

const TableBody: React.FC<TableBodyProps> = ({ collection, data }) => {
  console.log(data);
  const d = [];
  const columns = ["#"].concat(Object.keys(data[0]));
  return (
    <div className=" rounded-xl overflow-x-auto bg-[rgba(242,244,245,0.57)]">
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
          {data.length > 0 &&
            data.map((row, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-3 bg-[rgba(221,224,226,0.86)]">
                  <Typography
                    placeholder={PLACEHOLDER}
                    className="font-semibold"
                  >
                    #{index + 1}
                  </Typography>
                </td>
                {Object.values(row).map((value, index) => (
                  <td
                    className={twMerge(
                      "p-3 max-h-[150px]",
                      !even(index) && "bg-[rgba(221,224,226,0.86)]"
                    )}
                    key={index}
                  >
                    <Typography placeholder={PLACEHOLDER} variant="small">
                      {typeof value === "string"
                        ? value
                        : value instanceof Date
                        ? value.toLocaleDateString()
                        : typeof value === "object" && value !== null
                        ? (value as { name?: string }).name
                          ? (value as { name?: string }).name
                          : (value as { country?: string }).country
                          ? (value as { country?: string }).country
                          : JSON.stringify(value, null, 2)
                        : null}
                    </Typography>
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
