import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "../components/Navbars/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

// views

import Login from "../views/auth/Login";
import Recover from "../views/auth/Recover";
import UpdatePassword from "../views/auth/RecoverPassword/UpdatePassword";
import VerifyCode from "../views/auth/RecoverPassword/VerifyCode";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/recover/code" exact component={Recover} />
            <Route path="/auth/recover/verify" exact component={VerifyCode} />
            <Route
              path="/auth/recover/update"
              exact
              component={UpdatePassword}
            />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
