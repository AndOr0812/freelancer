import React,{ Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {authenticateUser} from "../actions";
import { withRouter } from "react-router-dom";

class Login extends Component {

    componentWillMount(){
        if (JSON.stringify(this.props.current_user) !== "{}"){
            this.props.history.push('/profile');
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(`Current User Next Props Value is ${nextProps.current_user}`);
        if (JSON.stringify(nextProps.current_user) !== "{}"){
            this.props.history.push('/profile');
        }
    }


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
            console.log('return from the callback');
            console.log(result_user);
            if (result_user.error === 'Invalid Email Id and password'){
                let err_msg = "Invalid Email ID and/or Password";
                document.getElementById("message").innerHTML = err_msg;
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
                <div id="message"> </div>
{/*                <Modal>
                    <BrowserRouter>
                        <Signup />
                    </BrowserRouter>
                </Modal>*/}
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

const mapStateToProps = state => {
    return {
        current_user : state.userProfile
    }
};

export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    withRouter(connect(mapStateToProps,{authenticateUser})(Login))
);