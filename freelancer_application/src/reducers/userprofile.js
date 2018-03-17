import React,{ Component } from 'react';
import {AUTHENTICATE_USER,LOGOUT_USER} from '../actions';

export default function (state = {},action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            const userDet = action.payload.user;
            const login_check = userDet.isLoggedIn;
            const user_details = userDet.details;
            console.log('inside userprofile reducer');
            window.sessionStorage.setItem('is_logged_in',login_check);
            console.log('name is ' + user_details.name);
            console.log('email id is '+ user_details.emailid);
            return {'isLoggedIn': login_check,'name' : user_details.name, 'emailid': user_details.emailid};
        case LOGOUT_USER:
            console.log('inside logout reducer');
            window.sessionStorage.setItem('is_logged_in','false');
            return {};
        default:
            return state;
    }
}