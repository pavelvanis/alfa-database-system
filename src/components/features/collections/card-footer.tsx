import React from "react";
import { CollectionCardProps } from "./collection-card";
import { Button, CardFooter } from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const PLACEHOLDER = "placeholder";

const CollectionCardFooter: React.FC<CollectionCardProps> = ({ url, name }) => {
  return (
    <CardFooter placeholder={PLACEHOLDER} className="pt-0 flex justify-end">
      <Link href={url || "#"}>
        <Button
          placeholder={PLACEHOLDER}
          size="sm"
          variant="text"
          className="flex items-center gap-3"
        >
          Go to {name}
          <ArrowLongRightIcon className="h-5" />
        </Button>
      </Link>
    </CardFooter>
  );
};

export default CollectionCardFooter;
