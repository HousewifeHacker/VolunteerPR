import { listOrgs } from "../api/needs";

import React, { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";
import OrgList from "./orgList";

export default function Nonprofits(props) {
  const [results, setResults] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  // TODO error message
  useEffect(() => {
    const fetchData = async () => {
      const result = await listOrgs();
      setResults(result["results"] || []);
      setHasFetched(true);
    };
    fetchData();
  }, []);

  return (
    <Container>
      {hasFetched ? (
        results.length ? (
          <OrgList results={results} />
        ) : (
          <h3>No Data Found</h3>
        )
      ) : (
        <Spinner color={"secondary"} />
      )}
    </Container>
  );
}
