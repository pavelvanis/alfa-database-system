import { CardBody, Typography } from "@material-tailwind/react";
import React from "react";
import { twMerge } from "tailwind-merge";

import { CollectionCardProps } from "./collection-card";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

const PLACEHOLDER = "placeholder";

const BATCH = 5;

const CollectionCardBody: React.FC<CollectionCardProps> = ({ name, data }) => {
  const HEAD = ["#"].concat(Object.keys(data[0]));
  const sliced_data = data.slice(0, BATCH);
  const nextData = data.length > BATCH;

  return (
    <CardBody placeholder={PLACEHOLDER} className="px-3 overflow-x-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {HEAD.map((head, index) => (
              <th
                key={head}
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  placeholder={PLACEHOLDER}
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  {head}{" "}
                  <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sliced_data.map((props, index) => {
            const values = Object.values(props);
            const isLast = index === sliced_data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography
                    placeholder={PLACEHOLDER}
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                {values.map((value, index) => {
                  const isLast = index === values.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <td
                      key={index}
                      className={twMerge(classes, "max-w-[300px]")}
                    >
                      <Typography
                        placeholder={PLACEHOLDER}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {typeof value === "function" && value.toString()}
                        {typeof value === "string"
                          ? value
                          : JSON.stringify(value, null, 2)}
                      </Typography>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </CardBody>
  );
};

export default CollectionCardBody;
