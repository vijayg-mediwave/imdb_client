import React from "react";
import Page from "../components/Page";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Page title="404">
      <Link to="/">&larr; Go to homepage</Link>
      <h1>404 - page not found</h1>
    </Page>
  );
};

export default NotFoundPage;
