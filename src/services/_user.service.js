import {
    api,
    authHeader
} from '../utils'
const signup = async({username, password}) => {
    console.log(username, password)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password
        })
    };

    return fetch(`${api.url}/signup`, requestOptions).then(handleResponse);
}
const signin = ({username, password}) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    };
    return fetch(`${api.url}/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(user.token));

            return user;
        });

}
const getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${api.url}/users`, requestOptions).then(handleResponse);
}

const getUserInfo = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${api.url}/userinfo`, requestOptions).then(handleResponse).catch(err => alert);
}

const update = (user) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${api.url}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed const name with underscore because delete is a reserved word in javascript
const _delete = (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${api.url}/users/${id}`, requestOptions).then(handleResponse);
}
const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}



const userServices = {
    signup,
    signin,
    getAll,
    getUserInfo,
    update,
    _delete
}

export default userServices