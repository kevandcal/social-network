// All functions here must return an action.
import axios from "./axios";

export function getFriendsAndWannabes() {
    return axios
        .get("/friends-wannabes")
        .then(({ data }) => {
            console.log("data: ", data);
            return {
                type: "GET_FRIENDS_AND_WANNABES",
                friendsWannabes: data
            };
        })
        .catch(err => {
            console.log("actions.js receiveFriendsWannabes catch err: ", err);
        });
}

export function acceptWannabe(id) {
    console.log("acceptWannabe id in actions.js: ", id);
    return axios
        .post("/api/acceptfriend/" + id)
        .then(({ data }) => {
            console.log("data: ", data);
            return {
                type: "ACCEPT_WANNABE",
                friendsAndWannabes: data
            };
        })
        .catch(err => {
            console.log("actions.js acceptWannabes catch err: ", err);
        });
}

export function removeFriend(id) {
    console.log("removeFriend id in actions.js: ", id);
    return axios
        .post("/api/deletefriend/" + id)
        .then(({ data }) => {
            console.log("data: ", data);
            return {
                type: "REMOVE_FRIEND",
                friendsAndWannabes: data
            };
        })
        .catch(err => {
            console.log("actions.js removeFriend catch err: ", err);
        });
}

export function chatMessages(msgs) {
    console.log("actions.js chatMessages msgs: ", msgs);
    return {
        type: "GET_MESSAGES",
        messages: msgs
    };
}

export function chatMessage(msg) {
    console.log("actions.js chatMessage msg: ", msg);
    return {
        type: "GET_MESSAGE",
        message: msg
    };
}
