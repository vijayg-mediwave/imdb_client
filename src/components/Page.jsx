import React, { useEffect } from "react";
import Layout from "./Layout";

const Page = (props) => {
  let { title, skipNav } = props;
  //console.log(title);
  useEffect(() => {
    if (title) {
      document.title = `${title} | myimdb`;
    }
  }, []);
  return (
    <div>
      <Layout skipNav={skipNav}>{props.children}</Layout>
    </div>
  );
};

export default Page;
