import axios from 'axios';

export const CREATE_USER = 'create_user';

export const AUTHENTICATE_USER = 'authenticate_user';

const ROOT_URL = 'http://localhost:5000';

export function createUsers(values,callback) {
    console.log('inside create user action creator');
    console.log(values);
    const request = axios.post(`${ROOT_URL}/users/signup`,values)
        .then(() => callback())
        .catch(function (error) {
            console.log(error);
        });

    return {
        type: CREATE_USER,
        payload: request
    };
}

export function authenticateUser(values,callback) {
    console.log('inside authenticate user action creator');
    console.log(values);
    const request = axios.post(`${ROOT_URL}/users/login`,values)
        .then((res) => {
            console.log(res);
            callback(res.data)})
        .catch(function (error) {
            console.log(error);
        });

    return {
        type: AUTHENTICATE_USER,
        payload: request
    };

/*return (dispatch) => {
    request.then(
        ({data}) => {
            dispatch({
                type: AUTHENTICATE_USER,
                payload: data
            });
        }
    )
};*/
}