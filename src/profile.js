import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile({
    first,
    last,
    bio,
    imageurl,
    setBio,
    showImgModal
}) {
    return (
        <div className="profile font-white">
            <h2>
                Hey, {first} {last}!
            </h2>
            <ProfilePic
                first={first}
                last={last}
                imageurl={imageurl}
                showImgModal={showImgModal}
            />
            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}
