import React from "react";

export default function ProfilePic(props) {
    // console.log("profilepic.js props: ", props);
    // console.log("imageurl: ", props.imageurl);
    // let imageurl = props.imageurl || "img/default.png";
    return (
        <div>
            <img
                id="profile-pic"
                alt={props.first}
                title="Click to upload a profile picture"
                onClick={props.showImgModal}
                src={props.imageurl}
            />
        </div>
    );
}
