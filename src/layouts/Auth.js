import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

//import Navbar from "components/Navbars/AuthNavbar.js";
//import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "../views/auth/Login";



export default function Auth() {
  return (
    <>
      {/*<Navbar transparent />*/}
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          {/*<FooterSmall absolute />*/}
        </section>
      </main>
    </>
  );
}
