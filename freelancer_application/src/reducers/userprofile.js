import React,{ Component } from 'react';
import {AUTHENTICATE_USER} from '../actions';

export default function (state = {},action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            console.log('inside reducer');
            console.log(action.payload);
      /*      sessionStorage.setItem('name',action.payload.name);
            sessionStorage.setItem('emailid',action.payload.emailid);*/
        default:
            return state;
    }
}