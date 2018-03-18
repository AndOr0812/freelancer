import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class ImageUpload extends Component {
    render(){
        return (
            <div className="col-sm-3">
                <div className="card" style={{width: 15 +"rem"}}>
                    <img className="card-img-top" src="http://localhost:5000/uploads/mypic-1521332636649.jpeg" alt="Card image cap" />
                    <div className="card-body">
                        <h6 className="card-title font-weight-bold">{this.props.current_user.emailid}</h6>
                        <p className="card-text">This is for the phone number.</p>
                    </div>
                </div>
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
        current_user: state.userProfile,
        images : state.images
    }
};


export default withRouter(connect(mapStateToProps,null)(ImageUpload));

