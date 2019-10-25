import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilepic: "",
            uploaderIsVisible: false
        };
        this.file;
        this.handleChange = this.handleChange.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    uploadPicture(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/upload", formData)
            .then(response => {
                console.log(
                    "uploader.js uploadPicture axios.post /upload then data: ",
                    response
                );
                this.props.updateImage(response.data[0].profilepic);
            })
            .catch(err => {
                console.log(
                    "uploader.js uploadPicture axios.post /upload catch err: ",
                    err
                );
            });
    }

    render() {
        console.log("this.props: ", this.props);
        return (
            <div>
                <div
                    onClick={this.props.hideImgModal}
                    id="pic-uploader-background"
                />
                <div id="pic-uploader">
                    <h3>Want to change your profile picture?</h3>
                    <img
                        id="pic-uploader-current-pic"
                        src={this.props.imageurl}
                    />
                    <form id="uploader-form">
                        <input
                            onChange={this.handleChange}
                            type="file"
                            name="file"
                            accept="image/*"
                        />
                        <button onClick={this.uploadPicture}>Upload</button>
                    </form>
                </div>
            </div>
        );
    }
}
