import React,{ Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {postProject} from "../actions";
import { withRouter } from "react-router-dom";
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import Dropzone from 'react-dropzone';

const FILE_FIELD_NAME = 'files';

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
        <div>
            <Dropzone
                name={field.name}
                className={`form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`}
                onDrop={
                    ( filesToUpload, e ) => {
                        console.log("Uploaded files are:");
                        console.log(filesToUpload);
                        field.input.onChange(filesToUpload)
                    }
                }
            >
                <span className="form-group input-group-btn">
                    <span className="btn btn-info btn-file">
                        Browse&hellip;
                    </span>
                </span>
            </Dropzone>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                <ul>
                    { files.map((file, i) => <li key={i}><img src={file.preview}/> </li>) }
                </ul>
            )}
        </div>
    );
};

class PostProject extends Component {

    componentWillMount(){
        if (JSON.stringify(this.props.current_user) === "{}"){
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(`Current User Next Props Value is ${nextProps.current_user}`);
        if (JSON.stringify(nextProps.current_user) === "{}"){
            this.props.history.push('/login');
        }
    }

    renderMultiselect({ input, ...rest }){
        return (<div><Multiselect {...input}
                     onBlur={() => input.onBlur()}
                     value={input.value || []} // requires value to be an array
                     {...rest}/>
            <div className='text-help'>
        {rest.meta.touched ? rest.meta.error : ''}
        </div>
        </div>);
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
        this.props.postProject(values, result => {
            console.log("Return from the callback");
            console.log(result);
        });

     /*   axios({
            method: 'post',
            url: 'http://example.com/send/',
            body: body,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));*/
    }

    render(){
        const {handleSubmit} = this.props;

        return (
            <div>Post a Project
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">

                    <Field
                        hint = 'e.g. Build me a website'
                        type = 'text'
                        name = "proj_name"
                        component = {this.renderField}
                    />

                    <Field
                        hint = 'Describe your project here...'
                        type = 'textarea'
                        name = "proj_desc"
                        component = {this.renderField}
                    />

                    <div>
                        <label>Skills</label>
                        <Field
                            name="proj_skills"
                            component={this.renderMultiselect}
                            data={[ 'MySQL', 'NodeJS', 'ReactJS', 'Redux'  ]}/>
                    </div>

                    <div>
                        <label htmlFor={FILE_FIELD_NAME}>Files</label>
                        <Field
                            name={FILE_FIELD_NAME}
                            component={renderDropzoneInput}
                        />
                    </div>

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
    console.log(JSON.stringify(values));
    const errors = {};
    console.log(JSON.stringify(values.files));

    if (!values.proj_name){
        errors.proj_name = 'Please Enter a project name.'
    }
    if (!values.proj_desc){
        errors.proj_desc = 'Please Enter the project description.'
    }
    console.log(`project skills data is ${values.proj_skills}`)
    if(!values.proj_skills){
        console.log("Inside the project skills if clause");
        errors.proj_skills = 'Please select at lease one skills'
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
    form: 'PostProjectForm'
})(
    withRouter(connect(mapStateToProps,{postProject})(PostProject))
);