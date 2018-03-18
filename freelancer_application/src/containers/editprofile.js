import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {withRouter} from 'react-router-dom';
import {getImages} from "../actions";
import ImageUpload from './imageupload';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
//const  { DOM: { textarea } } = React;

class EditUserProfile extends Component{

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
        return (
        <div className='form-group'>
                <textarea className="form-control" defaultValue={input.value || rest.existing_aboutme} placeholder="Content" rows="5" cols="50"></textarea>
            <div>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
    }

    renderField(field){

        console.log(JSON.stringify(field));
        console.log(`Existing value passed is ${field.existing_value}`)

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

    render(){
        const {handleSubmit} = this.props;

        return (<div>

                    <div className="row mt-3">
                        <label htmlFor="upload_image">
                            <input id="upload_image" type="file" style={{visibility: 'hidden'}}/>
                        <ImageUpload/>
                        </label>
                        <div className="col-sm-6">
                            <form className='form-group'>
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
                                {/*<input className='form-control' type="text" value={this.props.current_user.name}/>*/}
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
                                        existing_value={this.props.current_user.name}
                                        component = {this.renderField}
                                    />
                                </div>
                                {/*<input className='form-control' type="text" value={this.props.current_profile_details.phone}/>*/}
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>About Me</h4>
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        name="aboutme"
                                        existing_aboutme={this.props.current_user.name}
                                        component={this.renderTextArea}
                                    />
                                </div>
                                {/*<input className='form-control' style={{height: 150+'px'}} type="text" value={this.props.current_profile_details.aboutme}/>*/}
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
}

function validate(values) {
    //console.log(values);
 /*   const errors = {};

    if (!values.emailid){
        errors.emailid = 'Please Enter the EmailID'
    }
    if (!values.password){
        errors.password = 'Please Enter the Password'
    }
    return errors;*/
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
    withRouter(connect(mapStateToProps,{getImages})(EditUserProfile))
);
