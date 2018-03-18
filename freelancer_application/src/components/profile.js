import React, { Component } from 'react';
import {connect} from 'react-redux';
import Headers from './headers';
import {withRouter} from "react-router-dom";
import ImageUpload from '../containers/imageupload';
//import EditUserProfile from '../containers/editprofile';
import {profileUpdate, uploadFile} from "../actions";

//import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

let FILE_PATH="";

class Profile extends Component{
    componentWillMount(){
        if (JSON.stringify(this.props.current_user) === "{}"){
            this.props.history.push('/login');
        }
    }
/*
    componentWillUpdate(){
        if (JSON.stringify(this.props.current_user) === '{}'){
            console.log("Please login, since the current user is null");
            this.props.history.push('/login')
        }
    }*/

    renderMultiselect({ input, ...rest }){
        return (<div><Multiselect {...input}
                                  onBlur={() => input.onBlur()}
                                  value={input.value || rest.existing_skills || []}
                                  {...rest}/>
            <div className='text-help'>
                {rest.meta.touched ? rest.meta.error : ''}
            </div>
        </div>);
    }
    renderTextArea({input, meta: { touched, error, warning },...rest}) {
        console.log("Inside the render textarea");
        console.log(JSON.stringify(input));
        console.info('rest params',rest);
        return (
            <div className='form-group'>
                <textarea className="form-control" name = {input.name} value={input.value || rest.existing_aboutme} placeholder="Content" rows="5" cols="50"></textarea>
                <div>
                    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </div>
            </div>
        );
    }

    renderField(field){

        console.log(JSON.stringify(field));
        console.log(`Existing value passed is ${field.existing_value}`);

        const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`;

        return (
            <div className={className}>
                <input
                    className='form-control'
                    type = {field.type}
                    placeholder= {field.hint}
                    defaultValue={field.existing_value}
                />
                <div className='text-help'>
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);

        console.log("calling the uploadfile dispatcher function");
        this.props.uploadFile(payload,(filename) => {
            if(!filename){
                console.log("There is an error while uploading the image");
            }
            else {
                console.log("Inside the callback function, Uploded File name is");
                console.log(filename);
                FILE_PATH='http://localhost:/5000/uploads/'+filename;
            }
        });
    };

    onSubmit(values){
        values.emailId = this.props.current_user.emailid;
        console.log("After including the current user emailid");
        console.log(JSON.stringify(values));
        if(FILE_PATH !== this.props.current_profile_details.imgPath){
            values.imgPath = FILE_PATH;
        }
        else {
            values.imgPath = this.props.current_profile_details.imgPath;
        }
        console.log("After updating the image Path");
        console.log(JSON.stringify(values));
        this.props.profileUpdate(values,(result_user)=>{
            console.log('return from the callback');
            console.log(result_user);
            if (result_user.error === 'Invalid Email Id and password'){
                let err_msg = "Invalid Email ID and/or Password";
                document.getElementById("message").innerHTML = err_msg;
            }
        });
    }

    conditionalRendering(handleSubmit) {
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
        else if (JSON.stringify(this.props.current_profile_details) === '{}'){
            return (
            <div>
                <div className="row mt-3">
                    <label htmlFor="upload_image">
                        <input id="upload_image" type="file" style={{visibility: 'hidden'}} onChange={this.handleFileUpload}/>
                        <ImageUpload/>
                    </label>
                    <div className="col-sm-6">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='form-group'>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Name </h4>
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        hint = 'Name'
                                        type = 'text'
                                        name = "name"
                                        existing_value={this.props.current_user.name}
                                        component = {this.renderField}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Phone Number</h4>
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        hint = 'Phone Number'
                                        type = 'text'
                                        name = "phone"
                                        existing_value={this.props.current_profile_details.phone}
                                        component = {this.renderField}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>About Me</h4>
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        name="aboutme"
                                        existing_aboutme={this.props.current_profile_details.aboutme}
                                        component={this.renderTextArea}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Skills</h4>
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        name="user_skills"
                                        existing_skills={["MySQL"]}
                                        component={this.renderMultiselect}
                                        data={[ 'MySQL', 'NodeJS', 'ReactJS', 'Redux'  ]}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <button type='submit' className='btn btn-primary'>
                                    Submit
                                </button>
                                <button type="cancel" className='btn btn-default'>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-3 mt-3" style={{height: 50 +"rem"}}>
                        <button className="btn btn-primary btn-block">View Profile</button>
                    </div>
                </div>
            </div>
            );
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
                            <h6 className="font-weight-light">{this.props.current_profile_details.aboutme}
                            </h6>
                        </div>
                        <div className="row">
                            <h4>Skills</h4>
                        </div>
                        <div className="row">
                            <h6 className="font-weight-light">{JSON.stringify(this.props.current_profile_details.skills)}</h6>
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
        const {handleSubmit} = this.props;



        return (<div className="container">
            <Headers/>
            {this.conditionalRendering(handleSubmit)}
        </div>);
    }
}

function validate(values) {
    //console.log(values);
    const errors = {};

    if(values.phone){
        if(values.phone.length!== 10) {
            errors.phone = "Must be 10 digits";
        }
        else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.phone)) {
            errors.phone = "Phone number should be either in the form of xxx-xxx-xxxx or  XXX.XXX.XXXX or  XXX XXX XXXX"
        }
    }

    if(!values.name){
        errors.name = "Name should not be Empty."
    } else if(values.name.length <2 || values.name.length >30){
        errors.name="Name should be min 2 chars and max 30 chars";
    }

    return errors;
}


const mapStateToProps=(state)=>{
    return {
        current_user:state.userProfile,
        current_profile_details : state.profileDetails,
        images: state.images
    }
};

export default reduxForm({
    validate,
    form: 'EditProfileForm'
})(
    withRouter(connect(mapStateToProps,{uploadFile,profileUpdate})(Profile))
);
