//
// Encrypts user contents
//

// Load environment variables from project .env file
require('node-env-file')(__dirname + '/.env');

const Tanker = require("@tanker/core").default;

const tanker = new Tanker({
    "trustchainId" : process.env.TRUSTCHAIN_ID
});

// Open Tanker session for the user
tanker.open(process.env.USER_ID || "12345" , process.env.USER_TOKEN)
    .then((status) => {
        return tanker.encrypt("These are very secret contents");
    })
    .then((encrypted) => {
        console.log(`encrypted:\n${encrypted}`)
    })
    .catch(console.log)

