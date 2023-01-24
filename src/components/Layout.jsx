import React from "react";
import Container from "./Container";
import Nav from "./Nav";

const Layout = (props) => {
  let { skipNav } = props;
  return (
    <Container>
      {!skipNav && <Nav />}
      {props.children}
    </Container>
  );
};

export default Layout;
