import React,{ Component } from 'react';
import {Field , reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createUsers} from "../actions";

class SignUp extends Component {

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
        this.props.createUsers(values,(data)=>{
            if (!data.success) {
                let err_msg = "";
                if (data.error.name === "SequelizeUniqueConstraintError") {
                    err_msg = "User with Email ID already Exists";
                }
                else if (data.error === 'Please submit the required fields') {
                    err_msg = "Please submit the required fields"
                }
                else {
                    err_msg = (data.error.name) ? data.error.name : data.error;
                }
                document.getElementById("message").innerHTML = err_msg;
                return;
            }
            console.log("In the callback function with no error");
            this.props.history.push('/login');
        });
    }

    render(){
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    hint = 'Name'
                    type = 'text'
                    name = "name"
                    component = {this.renderField}
                />
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
      {/*          <div className='btn btn-secondary'>
                <Field
                    hint = ''
                    type = 'radio'
                    name = "type_of_user"
                    value = '1'
                    component = {this.renderField}
                /><label>Hire</label>
                </div>
                <div className='btn btn-secondary'><label>
                <Field
                    hint = ''
                    type = 'radio'
                    name = "type_of_user"
                    value = '0'
                    component = {this.renderField}
                />{' '} Work</label>
                </div>*/}
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
                <div id="message"></div>
            </form>
        );
    }
}

function validate(values) {
    //console.log(values);
    const errors = {};

    if (!values.name){
        errors.name = 'Please Enter the Name'
    }
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
    form: 'SignUpForm'
})(
    connect(null,{createUsers})(SignUp)
);