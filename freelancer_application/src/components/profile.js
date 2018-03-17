import React, { Component } from 'react';
import {connect} from 'react-redux';
import Headers from './headers';
import {withRouter} from "react-router-dom";

class Profile extends Component{

    componentWillMount(){
        if (JSON.stringify(this.props.current_user) === "{}"){
            this.props.history.push('/login');
        }
    }

    componentWillUpdate(){
        if (JSON.stringify(this.props.current_user) === '{}'){
            console.log("Please login, since the current user is null");
            this.props.history.push('/login')
        }
    }
    conditionalRendering() {
        console.log('inside profile page');
        console.log("Current User is");
        console.log(JSON.stringify(this.props.current_user));

        console.log(typeof JSON.stringify(this.props.current_user));

        if (JSON.stringify(this.props.current_user) === '{}'){
            console.log("Please login, since the current user is null");
            return (<div>
                <div>
                    "Please login, since the current user is null"
                </div>
                <div>{this.props.history.push("/login")}</div>
                </div>);
        }
        else {
            return (
                <div>
                    <h2>welcome {this.props.current_user.name}</h2>
                    <div>
                        <label>Name: </label><span>{this.props.current_user.name}</span>
                    </div>
                    <div>
                        <label>Email: </label><span>{this.props.current_user.emailid}</span>
                    </div>
                </div>
            );
        }
    }

    render(){

        return (<div>
            <Headers/>
            {this.conditionalRendering()}
        </div>);
    }
}


const mapStateToProps = state => {
    return {
        current_user : state.userProfile
    }
};
export default withRouter(connect(mapStateToProps)(Profile));