import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const otherUser = this.props.match.params.id;
        axios
            .get("/api/user/" + otherUser)
            .then(({ data }) => {
                console.log(
                    "otherprofile componentDidMount get /api/user/ + otherUser data: ",
                    data
                );
                if (
                    data.ownUserId === data.user.id ||
                    !data.user ||
                    data.user == undefined
                ) {
                    this.props.history.push("/");
                } else {
                    this.setState(data.user);
                }
            })
            .catch(err => {
                console.log(
                    "otherprofile.js componentDidMount GET /user/:id catch err: ",
                    err
                );
                this.props.history.push("/");
            });
    }

    render() {
        return (
            <div className="profile font-white">
                <h2>
                    {this.state.first} {this.state.last}
                </h2>
                <img
                    className="big-pic"
                    src={
                        this.state.profilepic ||
                        "../pictures/default-profilepic.png"
                    }
                />
                <p>{this.state.bio}</p>
                <FriendButton otherUser={this.props.match.params.id} />
            </div>
        );
    }
}
