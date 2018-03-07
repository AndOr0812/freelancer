import React, { Component } from 'react';
import Headers from './headers';

const logged_username = sessionStorage.getItem('name');
const logged_usermail = sessionStorage.getItem('emailid');

class Profile extends Component{

    render(){
        console.log('inside profile page');
        console.log(logged_usermail + logged_username);

        return (
            <div>
                <Headers/>
                <h2>welcome {logged_username}</h2>
                <div>
                    <label>Name: </label><span>{logged_username}</span>
                </div>
                <div>
                    <label>Email: </label><span>{logged_usermail}</span>
                </div>
            </div>
        );
    }
}

export default Profile;