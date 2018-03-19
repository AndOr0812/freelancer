import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Calculator from "./Calculator";
import Message from "./Message";
import Welcome from "./Welcome";

class NewerHomePage extends Component {

    state = {
        message: 'Calculator',
    };

    handleAdd = (userdata) => {
        API.add(userdata)
            .then((response) => {
                //let msg = JSON.stringify(response.message);
                this.setState({message:response.message});
                console.log(response)
            });
    };

    handleSub = (userdata) => {
        API.subtract(userdata)
            .then((response) => {
                //let msg = JSON.stringify(response.message);
                this.setState({message:response.message});
                console.log(response)
            });
    };

    handleMul = (userdata) => {
        API.multiply(userdata)
            .then((response) => {
                //let msg = JSON.stringify(response.message);
                this.setState({message:response.message});
                console.log(response)
            });
    };

    handleDiv = (userdata) => {
        API.divide(userdata)
            .then((response) => {
                //let msg = JSON.stringify(response.message);
                this.setState({message:response.message});
                console.log(response)
            });
    };

    render() {
        return (
            <div className="container-fluid">

                <Route exact path="/" render={() => (
                    <div>
                        <Calculator handleAdd={this.handleAdd}
                               handleSub={this.handleSub}
                               handleMul={this.handleMul}
                               handleDiv={this.handleDiv}
                        />
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/welcome" render={() => (
                    <Welcome username={this.state.message}/>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);