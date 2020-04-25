import { detailOrg } from "../api/needs";

import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router";
import { Spinner } from "reactstrap";
import OpportunitiesList from "./opportunitiesList";

export default function NonprofitDetails(props) {
  const [result, setResult] = useState({});
  const [hasFetched, setHasFetched] = useState(false);
  const { orgId } = useParams();

  // TODO error message
  useEffect(() => {
    const fetchData = async () => {
      const result = await detailOrg(orgId);
      setResult(result || {});
      setHasFetched(true);
    };
    fetchData();
  }, [orgId]);

  return (
    <Fragment>
      {hasFetched ? (
        result.id ? (
          <Fragment>
            <h1>{result.title}</h1>
            <OpportunitiesList orgId={orgId} />
          </Fragment>
        ) : (
          <h3>No Data Found</h3>
        )
      ) : (
        <Spinner color={"secondary"} />
      )}
    </Fragment>
  );
}
