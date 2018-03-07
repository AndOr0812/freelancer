import { combineReducers } from 'redux';
import userProfileReducer from './userprofile';
import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
    userProfile : userProfileReducer,
    form : formReducer
});

export default rootReducer;
