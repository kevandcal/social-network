import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(response => {
                console.log(
                    "Login handleClick axios.post /login then response: ",
                    response
                );
                if (response.data.success === "no") {
                    this.setState({
                        error: true
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log(
                    "Login handleClick axios.post /login catch err: ",
                    err
                );
                this.setState({
                    error: true
                });
            });
    }

    render() {
        return (
            <div>
                <h2>Welcome back!</h2>
                <form>
                    <div className="welcome-input-fields-container">
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
                    <button onClick={this.handleClick}>Log in</button>
                </form>
                {this.state.error && (
                    <h4>Oops, something went wrong. Please try again.</h4>
                )}
            </div>
        );
    }
}
