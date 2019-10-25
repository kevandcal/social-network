import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { init } from "./socket";

// const socket = io.connect();

// socket.on("hi", ({ msg }) => {
//     console.log(msg);
//     socket.emit("howAreYou", {
//         msg: "how are you?"
//     });
// });

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
let elem;

if (location.pathname === "/welcome") {
    // if user is on /welcome, (s)he is thus NOT logged in, so we should render the registration component
    elem = <Welcome />;
} else {
    // if else runs, user thus IS logged in
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
