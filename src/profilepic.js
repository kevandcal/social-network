import React from "react";

export default function ProfilePic(props) {
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
