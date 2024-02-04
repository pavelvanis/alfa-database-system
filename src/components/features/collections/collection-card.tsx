"use client";
import { Card } from "@material-tailwind/react";
import React from "react";
import CollectionCardHeader from "./card-header";
import CollectionCardBody from "./card-body";
import CollectionCardFooter from "./card-footer";

const PLACEHOLDER = "placeholder";

export interface CollectionCardProps {
  name: string;
  url?: string;
  description: string;
  data: any[];
}

const CollectionCard: React.FC<CollectionCardProps> = (props) => {
  return (
    <Card placeholder={PLACEHOLDER} className="w-fit min-w-[300px]">
      <CollectionCardHeader {...props} />
      <CollectionCardBody {...props} />
      <CollectionCardFooter {...props} />
    </Card>
  );
};

export default CollectionCard;
