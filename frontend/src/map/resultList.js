import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export default function ResultView({ results }) {
  if (!results.length) {
    return <h2>None</h2>;
  } else {
    return (
      <Fragment>
        {results.map((result, idx) => {
          return (
            <Card key={idx} className={"mb-3"}>
              <CardBody className={"text-monospace"}>
                <CardTitle
                  tag={"h6"}
                  className={"text-primary text-uppercase mb-1"}
                >
                  {result.category}
                </CardTitle>
                <CardText tag={"h5"}>
                  <span className={"font-weight-bold"}>{result.title}</span>
                  <br />
                  <Link
                    to={`/nonprofits/${result.organization.id}`}
                    className={"text-muted"}
                  >
                    with {result.organization.title}
                  </Link>
                  <br />
                  <span className={"text-muted"}>{result.city}</span>
                </CardText>
              </CardBody>
            </Card>
          );
        })}
      </Fragment>
    );
  }
}
