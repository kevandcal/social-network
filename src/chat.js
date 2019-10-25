import React, { useEffect, useRef } from "react";
import axios from "./axios";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector(state => state && state.messages);
    console.log("Here are my last 10 chat messages: ", chatMessages);

    const keyCheck = e => {
        console.log("e.key: ", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value: ", e.target.value);
            socket.emit("I wish I could use axios.post", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(
        () => {
            // console.log("chat mounted");
            // console.log("elemRef", elemRef.current);
            // console.log("scroll top:", elemRef.current.scrollTop);
            // console.log("scroll height:", elemRef.current.scrollHeight);
            // console.log("client height: ", elemRef.current.clientHeight);
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        },
        [chatMessages]
    );

    return (
        <div>
            <h2 />
            <div className="chat-messages" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((msg, id) => {
                        return (
                            <div key={id}>
                                <img src={msg.profilepic} />
                                <div className="font-white">
                                    <span className="chat-names">
                                        {msg.first} {msg.last} says:
                                    </span>{" "}
                                    {msg.message}
                                </div>
                            </div>
                        );
                    })}
            </div>
            <textarea
                placeholder="Type your message here. Press Enter to send."
                onKeyDown={keyCheck}
            />
        </div>
    );
}
