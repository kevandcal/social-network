import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonIsVisible: true,
            bioEditorIsVisible: false,
            bio: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showBioModal = this.showBioModal.bind(this);
    }

    showBioModal() {
        console.log("Made it to showBioModal in bioeditor.js");
        this.setState({
            bioEditorIsVisible: true,
            buttonIsVisible: false
        });
    }

    handleChange(e) {
        this.setState({
            bio: e.target.value
        });
    }

    handleClick(e) {
        console.log("this.props in bioeditor.js handleClick: ", this.props);
        e.preventDefault();
        console.log("bioeditor.js this.state.bio: ", this.state.bio);
        axios
            .post("/bio", { bio: this.state.bio })
            .then(response => {
                console.log(
                    "bioeditor.js handleClick axios.post /bio then response: ",
                    response
                );
                this.setState({
                    bioEditorIsVisible: false,
                    buttonIsVisible: true
                });
                this.props.setBio(response.data);
            })
            .catch(err => {
                console.log(
                    "bioeditor.js handleClick axios.post /bio catch err: ",
                    err
                );
            });
    }

    render() {
        if (this.state.buttonIsVisible) {
            return (
                <div className="bio-editor">
                    <p>{this.props.bio}</p>
                    <button onClick={this.showBioModal}>Edit Bio</button>
                </div>
            );
        } else {
            return (
                <div className="bio-editor">
                    <textarea
                        name="bio"
                        onChange={this.handleChange}
                        defaultValue={this.props.bio}
                    />
                    <button onClick={this.handleClick}>Commit</button>
                </div>
            );
        }
    }
}
