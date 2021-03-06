import React, { Fragment, useState } from "react";
import { Route } from "react-router-dom";

import TopNav from "./topNav";
import ResultView from "./resultView";

const TABS = [
  {
    text: "Needs",
    route: "NEEDS"
  },
  {
    text: "Necessities",
    route: "NECESSITIES"
  },
  {
    text: "Resources",
    route: "RESOURCES"
  },
  {
    text: "Volunteer Opportunities",
    route: "VOLUNTEER"
  }
];

export default function Map({ match }) {
  const [activeTab, setActiveTab] = useState(TABS[0]["route"]);
  return (
    <Fragment>
      <TopNav match={match} tabs={TABS} activeTab={activeTab} />
      <Route
        exact
        path={match.url}
        render={() => <h3>Please select a section:</h3>}
      />
      <Route
        path={`${match.url}/:section`}
        render={(props) => <ResultView {...props} setActiveTab={setActiveTab} />}
      />
    </Fragment>
  );
}
