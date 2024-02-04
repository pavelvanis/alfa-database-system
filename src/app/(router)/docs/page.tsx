import React from "react";

const DocsPage = async () => {
  const response = await fetch("http://localhost:3000/api/doctors");
  const data = await response.json();

  console.log(data);
  return <div>DocsPage</div>;
};

export default DocsPage;
