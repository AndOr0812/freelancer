import React from 'react';
import {GET_PROFILE_DETAILS} from "../actions";

export default function (state = {},action) {
    switch (action.type){
        case GET_PROFILE_DETAILS:
            console.log('inside get profile details reducer');
            //const images = action.payload.data;
            return {};
        default:
            return state;
    }
}