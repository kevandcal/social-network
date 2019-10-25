import React from "react";
import axios from "axios";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Logo from "./logo";

export default function Welcome() {
    return (
        <HashRouter>
            <div id="welcome-body">
                <h1 id="welcome-text">Welcome to another social network</h1>
                <Logo />
                <h4 id="welcome-text-below-logo">
                    This is a place to come together to do whatever
                </h4>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/login" component={Login} />
                </div>
            </div>
        </HashRouter>
    );
}
