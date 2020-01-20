import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import TopNav from "./topNav";
import Necessities from "./necessities";
import Needs from "./needs";
import Resources from "./resources";
import Volunteer from "./volunteer";

export default function Map({ match }) {
  return (
    <Fragment>
      <TopNav match={match} />
      <Route
        exact
        path={match.url}
        render={() => <h3>Please select a section:</h3>}
      />
      <Route path={`${match.url}/needs`} component={Needs} />
      <Route path={`${match.url}/necessities`} component={Necessities} />
      <Route path={`${match.url}/resources`} component={Resources} />
      <Route path={`${match.url}/volunteer`} component={Volunteer} />
    </Fragment>
  );
}
