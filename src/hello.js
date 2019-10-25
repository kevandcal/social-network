import React from "react";
import axios from "axios";

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // console.log(e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log("this.state: ", this.state)
        );
    }

    render() {
        return (
            <div>
                <h1>Hello, World!</h1>
                <form>
                    <input
                        type="text"
                        name="first"
                        placeholder="first"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="last"
                        placeholder="last"
                        onChange={this.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="email address"
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}
