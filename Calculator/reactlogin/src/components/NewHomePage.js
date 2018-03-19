import React, {Component} from 'react';
import * as API from '../api/API';
import Login from "./Calculator";
import Message from "./Message";

class NewHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: ''
    };

    handleSubmit = (userdata) => {
        console.log("reached N");
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!"

                    });
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
        console.log("New Home page")
    };

    render() {
        return (
            <div className="container-fluid">
                <Login handleSubmit={this.handleSubmit}/>
                <Message message={this.state.message}/>
            </div>
        );
    }
}

export default NewHomePage;