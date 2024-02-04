import { ChevronUpDownIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { getPrescriptions } from "./utils";
import { IPrescription } from "@/models/types";

const PLACEHOLDER = "Placeholder";
const TABLE_HEAD = [
  "Created at",
  "Expires at",
  "Picked at",
  "Doctor",
  "Patient",
  "Status",
  "Medicines",
  "",
];

const TABLE_ROWS = [
  {
    created_at: new Date(),
    expires_at: new Date(),
    doctor: "MuDR. Smith",
    patient: "Paul",
    status: "active",
    medicines: [
      {
        name: "Aspirin",
        quantity: 1,
        dosage: "1x1",
        days: 30,
      },
    ],
  },
  {
    created_at: new Date(),
    expires_at: new Date(),
    doctor: "MuDR. Smith",
    patient: "Paul",
    status: "expired",
    medicines: [
      {
        name: "Modafen",
        quantity: 1,
        dosage: "1x1",
        days: 30,
      },
      {
        name: "Penbene",
        quantity: 1,
        dosage: "1x1",
        days: 30,
      },
      {
        name: "Nurofen",
        quantity: 3,
        dosage: "1x1",
        days: 30,
      },
      {
        name: "Aspirin",
        quantity: 2,
        dosage: "1x1",
        days: 30,
      },
    ],
  },
  {
    created_at: new Date(),
    expires_at: new Date(),
    picked_at: new Date(),
    doctor: "MuDR. Smith",
    patient: "Paul",
    status: "picked",
    medicines: [
      {
        name: "Nurofen",
        quantity: 1,
        dosage: "1x1",
        days: 30,
      },
    ],
  },
];

type Data = {
  prescriptions: IPrescription[];
};

const TesterData = ({}: Data) => {
  return (
    <CardBody placeholder="Placeholder" className="px-0">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
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
                  {index !== TABLE_HEAD.length - 1 && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(
            (
              {
                created_at,
                expires_at,
                picked_at,
                doctor,
                patient,
                status,
                medicines,
              },
              index
            ) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  {/* created_at */}
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          placeholder={PLACEHOLDER}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {created_at.toLocaleDateString()}
                        </Typography>
                        <Typography
                          placeholder={PLACEHOLDER}
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {created_at.toLocaleTimeString()}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  {/* expires_at */}
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          placeholder={PLACEHOLDER}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {expires_at.toLocaleDateString()}
                        </Typography>
                        <Typography
                          placeholder={PLACEHOLDER}
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {expires_at.toLocaleTimeString()}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  {/* picked_at */}
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      {picked_at ? (
                        <div className="flex flex-col">
                          <Typography
                            placeholder={PLACEHOLDER}
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {picked_at.toLocaleDateString()}
                          </Typography>
                          <Typography
                            placeholder={PLACEHOLDER}
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {picked_at.toLocaleTimeString()}
                          </Typography>
                        </div>
                      ) : (
                        <Typography
                          placeholder={PLACEHOLDER}
                          variant="small"
                          className="font-normal"
                        >
                          Not picked
                        </Typography>
                      )}
                    </div>
                  </td>
                  {/* doctor */}
                  <td className={classes}>
                    <Typography
                      placeholder={PLACEHOLDER}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {doctor}
                    </Typography>
                  </td>
                  {/* patient */}
                  <td className={classes}>
                    <Typography
                      placeholder={PLACEHOLDER}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {patient}
                    </Typography>
                  </td>
                  {/* status */}
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={status}
                        color={
                          status === "active"
                            ? "blue"
                            : status === "picked"
                            ? "green"
                            : "red"
                        }
                      />
                    </div>
                  </td>
                  {/* medicines */}
                  <td className={classes}>
                    <Tooltip
                      content={medicines.map(({ name, quantity }, index) => {
                        const isLast = index === medicines.length - 1;

                        return `${name}: ${quantity}x${isLast ? "" : ", "}`;
                      })}
                      placement="top"
                    >
                      <div className="w-max max-h-20 overflow-hidden">
                        {medicines.map(({ name, quantity }, index) => {
                          const isLast = index === medicines.length - 1;
                          return (
                            <Typography placeholder={PLACEHOLDER} key={index}>
                              {name}
                              {`: ${quantity}x`}
                              {isLast ? "" : ", "}
                            </Typography>
                          );
                        })}
                      </div>
                    </Tooltip>
                  </td>
                  {/* actions */}
                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton placeholder={PLACEHOLDER} variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </CardBody>
  );
};

export default TesterData;
