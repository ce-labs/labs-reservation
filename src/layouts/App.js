import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbars/AppNavbar";
import FooterApp from "../components/Footers/FooterApp";


// views

import Profile from "../views/app/Profile";
import Reservations from "../views/app/Reservations";
import Users from "../views/app/Users";
import { useHistory } from "react-router-dom";


export default function App() {

    let history = useHistory();

    if(!localStorage.getItem('activeSession')){
        history.push('/auth');
    }

    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <Navbar />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/app/reservations" exact component={Reservations} />
                        <Route path="/app/users" exact component={Users} />
                        <Route path="/app/profile" exact component={Profile} />
                        <Redirect from="/app" to="/app/reservations" />
                    </Switch>
                    <FooterApp />
                </div>
            </div>
        </>
    );
}
