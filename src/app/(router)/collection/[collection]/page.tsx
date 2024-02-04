const CollectionPage = ({
  params: { collection },
}: {
  params: { collection: string };
}) => {
  return <div>{collection}</div>;
};

export default CollectionPage;
