import React from 'react';
import {GET_PROFILE_DETAILS,USER_PROFILE_UPDATE} from "../actions";

const initialState = {
    emailId: '',
    phone: '',
    aboutme: '',
    skills:[],
    imgPath: ''
}

export default function (state = initialState,action) {
    switch (action.type){
        case GET_PROFILE_DETAILS:
            console.log('inside get profile details reducer');
            //const images = action.payload.data;
            return state;
        case USER_PROFILE_UPDATE:
            console.log("Inside the user profile update reducer");
            const updated_profile = action.payload.updated_user_profile;
            return updated_profile;
        default:
            return state;
    }
}