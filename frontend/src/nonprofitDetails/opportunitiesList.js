import { listOrgNeeds } from "../api/needs";

import React, { useEffect, useState, Fragment } from "react";
import { Spinner } from "reactstrap";
import OpportunityCard from "./opportunityCard";

export default function OpportunitiesList({ orgId }) {
  const [results, setResults] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  // TODO error message
  useEffect(() => {
    const fetchData = async () => {
      const results = await listOrgNeeds(orgId);
      console.log(results);
      setResults(results["results"] || []);
      setHasFetched(true);
    };
    fetchData();
  }, [orgId]);

  return (
    <Fragment>
      {hasFetched ? (
        results.length ? (
          results.map((result, idx) => {
            return <OpportunityCard result={result} key={result.id}/>;
          })
        ) : (
          <h3>No Data Found</h3>
        )
      ) : (
        <Spinner color={"secondary"} />
      )}
    </Fragment>
  );
}
