import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import ResultList from "./resultList";

export default function ResultView({ match, setActiveTab }) {
  useEffect(() => {
    setActiveTab(match.params.section);
  }, [match.params.section, setActiveTab]);

  const results = [
    {
      category: "Material",
      title: "Food and Drinks",
      city: "San Juan",
      coordinates: {
        lat: 18.4529144,
        lng: -66.0582606
      }
    },
    {
      category: "First Aid",
      title: "National Hospital",
      city: "San Juan",
      coordinates: {
        lat: 18.4529144,
        lng: -66.0582606
      }
    }
  ];

  return (
    <Container>
      <h3>Section: {match.params.section}</h3>
      <Row>
        <Col>
          <ResultList results={results} />
        </Col>
        <Col>Map</Col>
      </Row>
    </Container>
  );
}
