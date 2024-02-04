import { PrinterIcon } from "@heroicons/react/24/outline";
import {
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { CollectionCardProps } from "./collection-card";
import Link from "next/link";

const PLACEHOLDER = "placeholder";

const CollectionCardHeader: React.FC<CollectionCardProps> = ({
  name,
  description,
  data,
  url,
}) => {
  return (
    <CardHeader
      floated={false}
      shadow={false}
      placeholder={PLACEHOLDER}
      className=" m-0 px-4 pt-4 pb-2 border-b-[1.5px] rounded-b-none"
    >
      <div className="flex justify-between gap-5 items-center">
        <div className="flex gap-4">
          <Typography
            placeholder={PLACEHOLDER}
            as={Link}
            href={url || "#"}
            color="blue-gray"
            className="font-bold uppercase hover:underline underline-offset-2 transition-all"
          >
            {name}
          </Typography>
          <Tooltip content="Documents">
            <Typography placeholder={PLACEHOLDER}>({data.length})</Typography>
          </Tooltip>
        </div>
        <div className="flex gap-3 items-center ">
          <Tooltip content="Export">
            <IconButton
              placeholder={PLACEHOLDER}
              size="sm"
              className="w-7 h-7 rounded-md"
              variant="outlined"
            >
              <PrinterIcon className=" w-full h-full" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div>
        <Typography placeholder={PLACEHOLDER} className="text-sm">
          {description}
        </Typography>
      </div>
    </CardHeader>
  );
};

export default CollectionCardHeader;
