import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myprofile: "highlighted",
            myfriends: "",
            findpeople: "",
            chatroom: ""
        };
        this.changeLinkColor = this.changeLinkColor.bind(this);
    }

    changeLinkColor(e) {
        console.log("changeLinkColor e.target.id: ", e.target.id);
        if (e.target.id === "myprofile") {
            this.setState({
                myprofile: "highlighted",
                myfriends: "",
                findpeople: "",
                chatroom: ""
            });
        } else if (e.target.id === "myfriends") {
            this.setState({
                myprofile: "",
                myfriends: "highlighted",
                findpeople: "",
                chatroom: ""
            });
        } else if (e.target.id === "findpeople") {
            this.setState({
                myprofile: "",
                myfriends: "",
                findpeople: "highlighted",
                chatroom: ""
            });
        } else if (e.target.id === "chatroom") {
            this.setState({
                myprofile: "",
                myfriends: "",
                findpeople: "",
                chatroom: "highlighted"
            });
        }
    }

    render() {
        return (
            <div id="menu-bar">
                <div id="menu-bar-links-container">
                    <Link
                        id="myprofile"
                        className={"menu-bar-links " + this.state.myprofile}
                        onClick={this.changeLinkColor}
                        to="/"
                    >
                        My Profile
                    </Link>
                    <div className="menu-bar-links-vert">|</div>
                    <Link
                        id="myfriends"
                        className={"menu-bar-links " + this.state.myfriends}
                        onClick={this.changeLinkColor}
                        to="/friends"
                    >
                        My Friends
                    </Link>
                    <div className="menu-bar-links-vert">|</div>
                    <Link
                        id="findpeople"
                        className={"menu-bar-links " + this.state.findpeople}
                        onClick={this.changeLinkColor}
                        to="/findpeople"
                    >
                        Find People
                    </Link>
                    <div className="menu-bar-links-vert">|</div>
                    <Link
                        id="chatroom"
                        className={"menu-bar-links " + this.state.chatroom}
                        onClick={this.changeLinkColor}
                        to="/chat"
                    >
                        Chat Room
                    </Link>
                    <div className="menu-bar-links-vert">|</div>
                    <a className="menu-bar-links" href="/logout">
                        Log Out
                    </a>
                </div>
            </div>
        );
    }
}
