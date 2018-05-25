
// Load environment variables from project .env file
require('node-env-file')(__dirname + '/.env');

const userToken = require('@tanker/user-token');
const { generateUserToken } = userToken;

// Store these configurations in a safe place
const trustchainId = process.env.TRUSTCHAIN_ID;
const trustchainPrivateKey = process.env.TRUSTCHAIN_PRIVATE_KEY;

// Example server-side function in which you would implement checkAuth(),
// retrieveUserToken() and storeUserToken() to use your own authentication
// and data storage mechanisms:
function getUserToken(userId) {
    const isAuthenticated = checkAuth(userId);

    // Always ensure userId is authenticated before returning a user token
    if (!isAuthenticated) {
        throw new Error('unauthorized');
    }

    // Retrieve a previously stored user token for this user
    let token = retrieveUserToken(userId);

    // If not found, create a new user token
    if (!token) {
        token = generateUserToken(trustchainId, trustchainPrivateKey, userId);

        // Store the newly generated user token
        storeUserToken(userId);
    }

    // From now, the same user token will always be returned to a given user
    return token;
}

// Fake auth
function checkAuth() {
    console.log("no authentication")
    return true;
}

// No persistent here
function retrieveUserToken() {
    console.log("no persistance")
    return null;
}

function storeUserToken() {
    console.log("no persistance")
}

// Retreive a token for the specified user
const userId = "12345"
const token = getUserToken(userId)
console.log(`NEW token: ${token} for user: ${userId}`)