import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [buttonText, setButtonText] = useState();

    useEffect(() => {
        axios
            .get("/api/friends/" + props.otherUser)
            .then(({ data }) => {
                console.log(
                    "friendbutton.js GET /api/friends/ + props.otherUser then {data}: ",
                    { data }
                );
                if (data.friendship === undefined) {
                    setButtonText("Add Friend");
                } else if (data.friendship.accepted === true) {
                    setButtonText("Unfriend");
                } else if (data.friendship.receiver_id === data.ownUserId) {
                    setButtonText("Accept Friend Request");
                } else {
                    setButtonText("Cancel Friend Request");
                }
            })
            .catch(err => {
                console.log(
                    "FriendButton.js useEffect GET /api/friends/ + props.otherUser catch err: ",
                    err
                );
            });
    }, []);

    function handleClick(e) {
        e.preventDefault();
        if (buttonText === "Add Friend") {
            // send friend request w/ INSERT
            axios
                .post("/api/friendrequest/" + props.otherUser)
                .then(({ data }) => {
                    console.log(
                        "FriendButton.js useEffect POST /api/friendrequest/ + props.otherUser then {data}: ",
                        { data }
                    );
                    setButtonText("Cancel Friend Request");
                })
                .catch(err => {
                    console.log(
                        "FriendButton.js useEffect POST /api/friendrequest/ + props.otherUser catch err: ",
                        err
                    );
                });
        } else if (
            buttonText === "Unfriend" ||
            buttonText === "Cancel Friend Request"
        ) {
            // delete friendship
            axios
                .post("/api/deletefriend/" + props.otherUser)
                .then(({ data }) => {
                    console.log(
                        "FriendButton.js useEffect POST /api/deletefriend/ + props.otherUser then {data}: ",
                        { data }
                    );
                    setButtonText("Add Friend");
                })
                .catch(err => {
                    console.log(
                        "FriendButton.js useEffect POST /api/deletefriend/ + props.otherUser catch err: ",
                        err
                    );
                });
        } else if (buttonText === "Accept Friend Request") {
            // update
            axios
                .post("/api/acceptfriend/" + props.otherUser)
                .then(({ data }) => {
                    console.log(
                        "FriendButton.js useEffect POST /api/acceptfriend/ + props.otherUser then {data}: ",
                        { data }
                    );
                    setButtonText("Unfriend");
                })
                .catch(err => {
                    console.log(
                        "FriendButton.js useEffect POST /api/acceptfriend/ + props.otherUser catch err: ",
                        err
                    );
                });
        }
    }

    return (
        <div>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    );
}
