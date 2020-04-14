import { listNeeds } from "../api/needs.js";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";

import ResultList from "./resultList";

export default function ResultView({ match, setActiveTab }) {
  const [results, setResults] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    setActiveTab(match.params.section);
  }, [match.params.section, setActiveTab]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await listNeeds(match.params.section);
      console.log(result);
      setResults(result["results"] || []);
      setHasFetched(true);
    };
    fetchData();
  }, [match.params.section]);

  return (
    <Container>
      <h3>Section: {match.params.section}</h3>
      <Row>
        <Col>
          {hasFetched ? (
            results.length ? (
              <ResultList results={results} />
            ) : (
              <h3>No Data Found</h3>
            )
          ) : (
            <Spinner color={"secondary"} />
          )}
        </Col>
        <Col>Map</Col>
      </Row>
    </Container>
  );
}
