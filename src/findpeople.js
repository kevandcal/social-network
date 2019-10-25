import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [matchingUsers, setMatchingUsers] = useState();

    useEffect(() => {
        axios
            .get("/newestusers")
            .then(({ data }) => {
                console.log(
                    "FindPeople.js useEffect GET /users then results: ",
                    data
                );
                setUsers(data);
            })
            .catch(err => {
                console.log(
                    "FindPeople.js useEffect GET /users catch err: ",
                    err
                );
            });
    }, []);

    useEffect(
        () => {
            if (!matchingUsers) {
                return;
            }
            axios
                .get("/matchingusers/?q=" + matchingUsers)
                .then(({ data }) => {
                    console.log(
                        "FindPeople.js useEffect GET /matchingusers then data: ",
                        data
                    );
                    setUsers(data);
                })
                .catch(err => {
                    console.log(
                        "FindPeople.js useEffect GET /matchingusers catch err: ",
                        err
                    );
                });
        },
        [matchingUsers]
    );

    return (
        <div className="users-container">
            <div className="users-text-and-input font-white">
                <h2 />

                <input
                    id="findpeople-text-input"
                    type="text"
                    placeholder="Enter name of person you'd like to find"
                    onChange={e => setMatchingUsers(e.target.value)}
                />

                {matchingUsers == undefined && (
                    <h2 className="text-above-users-list">Newest Members:</h2>
                )}
            </div>

            <div className="users-list">
                {users.map(user => (
                    <div className="user" key={user.id}>
                        <Link to={"/user/" + user.id}>
                            <p className="font-white no-decoration">
                                {user.first} {user.last}
                            </p>
                            <img
                                className="small-pic"
                                src={
                                    user.profilepic ||
                                    "../pictures/default-profilepic.png"
                                }
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
