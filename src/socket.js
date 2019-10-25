import * as io from "socket.io-client";
import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("message from server", msg => {
            console.log(`
                Got message from the front end.
                About to start redux stuff by dispatching an action.
                Mes message: ${msg}
                `);
        });

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};
