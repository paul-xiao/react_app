 const authHeader = () => {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('token'));

    if (token) {
        return { 'Authorization': token };
    } else {
        return {};
    }
}

export default authHeader