import TableBody from "@/components/features/table/table-body";
import TableHeader from "@/components/features/table/table-header";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

async function getCollection(collection: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/${collection}`);
  const data = await res.json();
  return data;
}

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

  const data = await getCollection(collection);

  return (
    <>
      <TableHeader {...{ collection, data }} />
      <TableBody {...{ collection, data }} />
    </>
  );
};

export default CollectionPage;
