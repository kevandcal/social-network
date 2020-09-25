import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsAndWannabes, acceptWannabe, removeFriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friendsWannabes = useSelector(state => state.friendsWannabes);
    const friends =
        friendsWannabes &&
        friendsWannabes.friendsAndWannabes.filter(
            people => people.accepted === true
        );
    const wannabes =
        friendsWannabes &&
        friendsWannabes.friendsAndWannabes.filter(
            people => people.accepted === false
        );
    console.log("friendsWannabes: ", friendsWannabes);
    console.log("friends: ", friends);
    console.log("wannabes: ", wannabes);

    useEffect(
        () => {
            dispatch(getFriendsAndWannabes());
        },
        [friendsWannabes]
    );

    if (friendsWannabes && friendsWannabes.friendsAndWannabes.length === 0) {
        console.log("friendsWannabes.length: ", friendsWannabes.length);
        return (
            <div className="users-container font-white">
                <h2>You have neither friends nor pending friend requests.</h2>
            </div>
        );
    } else {
        return (
            <div className="users-container font-white">
                {wannabes && wannabes.length > 0 && (
                    <h2 className="users-center">
                        {wannabes && wannabes.length == 1
                            ? "You currently have 1 pending friend request:"
                            : `You currently have ${
                            wannabes.length
                            } pending friend requests:`}
                    </h2>
                )}

                <div className="users-list">
                    {wannabes &&
                        wannabes.map((wannabe, id) => {
                            return (
                                <div className="user" key={id}>
                                    <p>
                                        {wannabe.first} {wannabe.last}
                                    </p>
                                    <img
                                        className="small-pic"
                                        src={
                                            wannabe.profilepic ||
                                            "../pictures/default-profilepic.png"
                                        }
                                    />
                                    <button
                                        value={wannabe.id}
                                        onClick={() =>
                                            dispatch(acceptWannabe(wannabe.id))
                                        }
                                    >
                                        Accept Friend Request
                                    </button>
                                </div>
                            );
                        })}
                </div>
                {friends && friends.length > 0 && (
                    <h2 className="users-center">
                        {friends && friends.length == 1
                            ? "You currently have 1 friend:"
                            : `You currently have ${friends.length} friends:`}
                    </h2>
                )}
                <div className="users-list">
                    {friends &&
                        friends.map((friend, id) => {
                            return (
                                <div className="user" key={id}>
                                    <p>
                                        {friend.first} {friend.last}
                                    </p>
                                    <img
                                        className="small-pic"
                                        src={
                                            friend.profilepic ||
                                            "../pictures/default-profilepic.png"
                                        }
                                    />
                                    <button
                                        value={friend.id}
                                        onClick={() =>
                                            dispatch(removeFriend(friend.id))
                                        }
                                    >
                                        Unfriend
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}
