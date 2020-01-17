import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import MapPage from "./map";
import MarketingPage from "./marketing";

// layout
import Header from "./header";
import Footer from "./footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={MarketingPage} />
        <Route exact path="/map" component={MapPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
