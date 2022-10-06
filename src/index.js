/*
=================================================================================
* Sistema de Reservación de Laboratorios CE - v1.0.0
=================================================================================
* Copyright 2022 ce-labs (https://github.com/ce-labs)
=================================================================================
* The above copyright notice and this permission notice shall 
  be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Auth from "layouts/Auth.js";

// views without layouts
import Index from "views/Index.js";
import App from "layouts/App";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/auth" component={Auth} />
      <Route path="/app" component={App} />
      {/* add routes without layouts */}
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
