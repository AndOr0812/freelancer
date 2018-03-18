import { combineReducers } from 'redux';
import userProfileReducer from './userprofile';
import imageReducer from './imagereducer';
import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
    userProfile : userProfileReducer,
    images: imageReducer,
    form : formReducer
});

export default rootReducer;
