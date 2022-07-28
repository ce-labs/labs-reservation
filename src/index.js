/*!
=================================================================================
* Sistema de Reservación de Laboratorios - v1.0.0
=================================================================================
* The above copyright notice and this permission notice shall 
  be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./assets/styles/scheduler.css";

// layouts

import Auth from "./layouts/Auth";
import App from "./layouts/App";

// views without layouts

import Index from "./views/Index";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/app" component={App} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
