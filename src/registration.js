import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            error: ""
        };
    }

    handleChange(e) {
        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick(e) {
        e.preventDefault();
        axios
            .post("/registration", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(response => {
                console.log(
                    "Registration handleClick axios.post /registration then response.data: ",
                    response.data
                );
                if (response.data.success === "no") {
                    this.setState({
                        error: true
                    });
                } else {
                    console.log("Hey, registration location.replace");
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log(
                    "Registration handleClick axios.post /registration catch err: ",
                    err
                );
            });
    }

    render() {
        return (
            <div>
                <h2>Dive in:</h2>
                <form>
                    <div className="welcome-input-fields-container">
                        <input
                            className="welcome-input-fields"
                            type="text"
                            name="first"
                            placeholder="first name"
                            onChange={this.handleChange}
                        />
                        <input
                            className="welcome-input-fields"
                            type="text"
                            name="last"
                            placeholder="last name"
                            onChange={this.handleChange}
                        />
                        <input
                            className="welcome-input-fields"
                            type="email"
                            name="email"
                            placeholder="email address"
                            onChange={this.handleChange}
                        />
                        <input
                            className="welcome-input-fields"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this.handleChange}
                        />
                    </div>
                    {this.state.error && (
                        <h4>Oops, something went wrong. Please try again.</h4>
                    )}
                    <button
                        className="welcome-buttons"
                        onClick={this.handleClick}
                    >
                        Register
                    </button>
                </form>
                <h4>
                    Already a member?{" "}
                    <Link className="font-orange" to="/login">
                        Log in
                    </Link>
                </h4>
            </div>
        );
    }
}
