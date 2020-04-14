import { listNeeds } from "../api/needs.js";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import { useParams } from "react-router-dom";

import ResultList from "./resultList";

export default function ResultView({ match, setActiveTab }) {
  const [results, setResults] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const { section } = useParams();
  useEffect(() => {
    setActiveTab(section);
  }, [section, setActiveTab]);
  // TODO error message
  useEffect(() => {
    const fetchData = async () => {
      const result = await listNeeds(section);
      setResults(result["results"] || []);
      setHasFetched(true);
    };
    fetchData();
  }, [section]);

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
