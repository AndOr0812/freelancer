const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const add = (payload) =>
    fetch(`${api}/users/add`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(payload);
            return response;
            /*.then(res => {
            console.log(res);
            return res.status;*/
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const subtract = (payload) =>
    fetch(`${api}/users/sub`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(payload);
            return response;
            /*.then(res => {
            console.log(res);
            return res.status;*/
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const multiply = (payload) =>
    fetch(`${api}/users/mul`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(payload);
            return response;
            /*.then(res => {
            console.log(res);
            return res.status;*/
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const divide = (payload) =>
    fetch(`${api}/users/div`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(payload);
            return response;
            /*.then(res => {
            console.log(res);
            return res.status;*/
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

