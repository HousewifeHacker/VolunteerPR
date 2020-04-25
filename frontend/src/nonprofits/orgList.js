import React, { Fragment } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export default function OrgList({ results }) {
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
                  {result.title}
                </CardTitle>
                <CardText tag={"h3"}>
                  <span className={"font-weight-bold"}>{result.description.slice(0, 100)}</span>
                </CardText>
              </CardBody>
            </Card>
          );
        })}
      </Fragment>
    );
  }
}
