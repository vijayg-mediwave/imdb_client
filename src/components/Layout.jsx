import React from "react";
import Container from "./Container";
import Nav from "./Nav";

const Layout = (props) => {
  return (
    <Container>
      <Nav />
      {props.children}
    </Container>
  );
};

export default Layout;
