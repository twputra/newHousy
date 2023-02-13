import React, { useEffect } from "react";

import Filter from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import ContentData from "../components/Content";
import Navbar from "../components/Navbar";

export default function Home(props) {
  return (
    <>
      <Navbar />
      <Row className="po">
        <Filter />
        <ContentData />
      </Row>
    </>
  );
}
