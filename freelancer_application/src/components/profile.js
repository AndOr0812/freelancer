import React, { Component } from 'react';
import {connect} from 'react-redux';
import Headers from './headers';
import {withRouter} from "react-router-dom";
import ImageUpload from '../containers/imageupload';
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
                <div className="row mt-3">
                    <ImageUpload/>
                    <div className="col-sm-6">
                        <div className="row">
                            <h2>{this.props.current_user.name}</h2>
                        </div>
                        <div className="row">
                            <p className="lead">Full Stack Developer</p>
                        </div>
                        <div className="row">
                            <h4>About Me</h4>
                        </div>
                        <div className="row">
                            <h6 className="font-weight-light">I am currently pursuing Master's in Software Engineering at San Jose State  area of specialization is Software Development, DevOps, Cloud Technologies, and Infrastructure. Also. I completed my Bachelor’s in Computer Science and Engineering at K L University, India with Distinction in 2014.
                            </h6>
                        </div>
                        <div className="row">
                            <h4>Skills</h4>
                        </div>
                        <div className="row">
                            <h6 className="font-weight-light">NodeJS, MYSQL, ReactJS</h6>
                        </div>
                    </div>
                    <div className="col-sm-3 mt-3" style={{height: 50 +"rem"}}>
                        <button className="btn btn-primary btn-block">Edit Profile</button>
                    </div>
                </div>
            );
        }
    }

    render(){

        return (<div className="container">
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