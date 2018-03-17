import axios from 'axios';
import FormData from 'form-data';

export const CREATE_USER = 'create_user';

export const AUTHENTICATE_USER = 'authenticate_user';

export const LOGOUT_USER = 'logout_user';

export const POST_PROJECT = 'post_project';

const ROOT_URL = 'http://localhost:5000';

//Action creator for the SignUp Page
export function createUsers(values,callback) {
    console.log('inside create user action creator');
    console.log(values);
    const request = axios.post(`${ROOT_URL}/users/signup`,values)
        .then(
            ({data}) => {
            console.log(`The data returned by signup api is : ${JSON.stringify(data)}`);
            callback(data);
        })
        .catch(function (error) {
            console.log(error);
        });

    return {
        type: CREATE_USER,
        payload: request
    };
}

//Action Creator for the Login Page
export function authenticateUser(values,callback) {
    console.log('inside authenticate user action creator');
    console.log(values);
    //const payload_response_data;
    const request = axios.post(`${ROOT_URL}/users/login`,values,{withCredentials:true});
/*        .then(
            ({data}) => {
                console.log(`The data returned by login api is : ${JSON.stringify(data)}`);
                callback(data);
            })
        .catch(function (error) {
            console.log(error);
        });

    return {
        type: AUTHENTICATE_USER,
        payload: request
    };*/


        return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("Inside the dispatcher function");
                console.log(data);
                callback(data);
                if (data.success) {
                    dispatch({
                        type: AUTHENTICATE_USER,
                        payload: data
                    });
                }
            }
        )};
}



//Action Creator for the Login Page
export function postProject(values,callback) {
    console.log('inside authenticate user action creator');
    console.log(JSON.stringify(values));
    let body = new FormData();
    /*body.append('')*/
    Object.keys(values).forEach(( key ) => {
        if (key === 'files')
            console.log("values[key] is ");
            console.log(values[key]);
        body.append(key, values[ key ]);
    });

    for (let pair of body.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    console.log("The body after mapping is");
    console.info(body);
    console.log("raw values is ");
    console.info(values);

    const request =fetch(`${ROOT_URL}/projects/new`, {
        method:'POST',
        body: body,
/*        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'multipart/form-data'
        },*/
    });
    //const payload_response_data;
/*    const request = axios({
        url : `${ROOT_URL}/projects/new`,
        method: 'POST',
        formData: body,
        withCredentials:true,
        headers: {
            'accept':'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type' : `multipart/form-data`,
        }
    });*/
    //const request = axios.post(`${ROOT_URL}/projects/new`,body);

    return (dispatch) => {
        request.then(
            (/*{data}*/) => {
                console.log("Inside the post project dispatcher function");
                /*console.log(data);
                callback(data);
                if (data.success) {
                    dispatch({
                        type: POST_PROJECT,
                        payload: data
                    });
                }*/
            }
        )};
}


export function logout(callback) {
    const request = axios.post(`${ROOT_URL}/users/logout`,{withCredentials:true});
    console.log("Inside the logout action creator")

    return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("Inside the Log Out dispatcher function");
                console.log(data);
                callback();
                dispatch({
                    type: LOGOUT_USER,
                    payload: {}
                });
            }
        )
    };

}