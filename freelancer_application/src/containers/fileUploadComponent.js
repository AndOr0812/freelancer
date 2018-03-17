import React,{ Component } from 'react';

class fileUploadComponent extends Component {
    onChange = (e) => {
        console.log("Inside the file Upload onChange event");
        console.info(e.target.files[0]);
    }
    render(){
        return (<div>
                <h1>Hello Akhil, Please try to submit the form</h1>
                <form>
                <input type="File" name="selectedFile" onChange={this.onChange}>
                </input>
                <button type="button">Submit</button>
                </form>
            </div>
        );
    }
}

export default fileUploadComponent;