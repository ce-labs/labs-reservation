import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Sidebar from "../components/Sidebar/Sidebar";

// views

import Profile from "../views/app/Profile";
import Reservations from "../views/app/Reservations";
import Users from "../views/app/Users";

export default function App() {

    return (
        <>
            <Sidebar />
            <Switch>
                <Route path="/app/reservations" exact component={Reservations} />
                <Route path="/app/users" exact component={Users} />
                <Route path="/app/profile" exact component={Profile} />
                <Redirect from="/app" to="/app/reservations" />
            </Switch>

        </>
    );
}
