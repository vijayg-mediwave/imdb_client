import React from "react";
import Layout from "./Layout";

const Page = (props) => {
  return (
    <div>
      <Layout>{props.children}</Layout>
    </div>
  );
};

export default Page;
