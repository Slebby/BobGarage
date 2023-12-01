// File: src/utils/setAuthToken.js
// This file will set up our token to be sent in our http headers.
// We will be send the token with every request we make.

// Import axios
import axios from "axios";

// Create our function.
// This function will take in a token.
const setAuthToken = token => {
    console.log('SetAuthToken');
    console.log(token);

    // Check if there is token
    if(token){
        // If we have a token, add the token to our axios requests in the http header, under the property 'x-auth-token': token
        axios.defaults.headers.common['bobgarage-auth-token'] = token;
    } else {
        // If there is no token, or we don't have a token, remove the key value pair from the http headers.
        delete axios.defaults.headers.common['bobgarage-auth-token'];
    }
}

// Export the function
export default setAuthToken;