import React,{ Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {authenticateUser} from "../actions";
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Signup from './signup';

import Modal from '../components/modal';
import Profile from "../components/profile";
import App from "../components/app";

class Login extends Component {
    renderField(field){

        const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`;
        return (
            <div className={className}>
                <input
                    className='form-control'
                    type = {field.type}
                    placeholder= {field.hint}
                    {...field.input}
                />
                <div className='text-help'>
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values){
        console.log(values);
        this.props.authenticateUser(values,(result_user)=>{
            console.log('return ffrom the callback');
            console.log(result_user);
            if (result_user === 'failure'){
                alert ('invalid username or password');
                //this.props.history.push('/login');
            }
            else{
                console.log('inside the else');
            sessionStorage.setItem('name',result_user.name);
            sessionStorage.setItem('emailid',result_user.emailid);
            this.props.history.push('/profile');
            }
        });
        }

    render(){
        const {handleSubmit} = this.props;

        return (
            <div>Login Page
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <Field
                    hint = 'Email Address'
                    type = 'email'
                    name = "emailid"
                    component = {this.renderField}
                />

                <Field
                    hint = 'Password'
                    type = 'password'
                    name = "password"
                    component = {this.renderField}
                />
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
            </form>
                <Modal>
                    <BrowserRouter>
                        <Signup />
                    </BrowserRouter>
                </Modal>
            </div>
        );
    }
}

function validate(values) {
    //console.log(values);
    const errors = {};

    if (!values.emailid){
        errors.emailid = 'Please Enter the EmailID'
    }
    if (!values.password){
        errors.password = 'Please Enter the Password'
    }


    return errors;
}
export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(null,{authenticateUser})(Login)
);