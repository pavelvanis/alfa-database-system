import mongoose from "mongoose";
import { notFound } from "next/navigation";

const CollectionPage = async ({
  params: { collection },
}: {
  params: { collection: string };
}) => {
  const collections = await mongoose.connection.db.listCollections().toArray();

  const available_collections = collections.map(
    (collection) => collection.name
  );

  if (!available_collections.includes(collection)) return notFound();
  return <div>{collection}</div>;
};

export default CollectionPage;
