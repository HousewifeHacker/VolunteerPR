import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import MapPage from "./map";
import MarketingPage from "./marketing";
import SignInHelpPage from "./signInHelp";
import AccountSettingsPage from "./accountSettings";
import NonProfitsPage from "./nonprofits";
import NonProfitDetailPage from "./nonprofitDetails";

// layout
import Header from "./header";
import Footer from "./footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={MarketingPage} />
        <Route path="/map" component={MapPage} />
        <Route path="/signin_help" component={SignInHelpPage} />
        <Route path="/account" component={AccountSettingsPage} />
        <Route
          exact
          path={"/nonprofits/:orgId"}
          component={NonProfitDetailPage}
        />
        <Route path={"/nonprofits"} component={NonProfitsPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
