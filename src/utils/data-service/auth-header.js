
/**
 * Add header authorization data
 * @returns {Object}
 */
function authHeader() {
    // return authorization header with JWT(JSON Web Token) token
    let user = JSON.parse(localStorage.getItem('SITE_DATA_AUTH'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export default authHeader;

/*
Example:

import authHeader from 'auth-header';
axios.post('api/path', {data: mydata}, { 
    headers: { 
        ...authHeader(),
        'Content-Type': 'application/json'  
    }
}).then(function (response) {
    ...
});

or

axios({
    method: 'post',
    url: 'api/path',
    data: {id: varID},
    headers: { 
        ...authHeader(),
        'Content-Type': 'application/json'  
    }
})


Note: For Node.js Express back-end, please use x-access-token header like this:

export default () => {
    // return authorization header with JWT(JSON Web Token) token
    let user = JSON.parse(localStorage.getItem('SITE_DATA_AUTH'));

    if (user && user.token) {
        return { 'x-access-token': user.token };
    } else {
        return {};
    }
}

*/
