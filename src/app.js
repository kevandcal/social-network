import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import Logo from "./logo";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";
import CuteAnimals from "./cute-animals";
import Friends from "./friends";
import Chat from "./chat";
import MenuBar from "./menu-bar";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            first: "",
            last: "",
            imageurl: "",
            bio: "",
            uploaderIsVisible: false,
            bioEditorIsVisible: false
        };
        this.setBio = this.setBio.bind(this);
        this.showImgModal = this.showImgModal.bind(this);
        this.hideImgModal = this.hideImgModal.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.copyright = this.copyright.bind(this);
    }

    componentDidMount() {
        // axios.get to server, which will do a db query to get user info from db.
        // Once we have info, do setState() to add it to state.
        axios
            .get("/user")
            .then(({ data }) => {
                console.log(
                    "app.js componentDidMount get /user then data: ",
                    data
                );
                let imageurl =
                    data.profilepic || "../pictures/default-profilepic.png";
                this.setState({
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    imageurl: imageurl,
                    bio: data.bio
                });
            })
            .catch(err => {
                console.log(
                    "app.js App componentDidMount axios.get /users then results: ",
                    err
                );
            });
    }

    updateImage(image) {
        this.setState({
            imageurl: image
        });
    }

    showImgModal() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    hideImgModal() {
        this.setState({
            uploaderIsVisible: false
        });
    }

    setBio(bio) {
        this.setState({
            bio: bio
        });
    }

    copyright() {
        return {
            __html: "Copyright &copy;2019 Orwellian Data-Collecting Industries"
        };
    }

    render() {
        return (
            <BrowserRouter>
                <div id="app-js-container">
                    <header>
                        <Logo />
                        <ProfilePic
                            imageurl={this.state.imageurl}
                            showImgModal={this.showImgModal}
                        />
                    </header>
                    <MenuBar />
                    <div id="app-js-body">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageurl={this.state.imageurl}
                                    showImgModal={this.showImgModal}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                            )}
                        />
                        {/*<Route path="/user/:id" component={OtherProfile} />*/}
                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route path="/findpeople" component={FindPeople} />
                        <Route path="/cuteanimals" component={CuteAnimals} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} />
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                imageurl={this.state.imageurl}
                                hideImgModal={this.hideImgModal}
                                updateImage={this.updateImage}
                            />
                        )}
                    </div>
                    <footer>
                        <div dangerouslySetInnerHTML={this.copyright()} />
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}
