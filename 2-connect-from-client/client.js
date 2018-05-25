//
// Encrypts user contents
//

// Data persistence layer in nodeJS
const PouchDBCore = require('pouchdb-core');
const PouchDBAdapterLevel = require('pouchdb-adapter-leveldb');
const PouchDBFind = require('pouchdb-find');
PouchDBCore.plugin(PouchDBAdapterLevel);
PouchDBCore.plugin(PouchDBFind);

const PouchDB = function (dbName) {
    const PouchDB = PouchDBCore.defaults({ adapter: 'leveldb' });
    return new PouchDB(`./data/${dbName}`);
}

// Load environment variables from project .env file
require('node-env-file')(__dirname + '/.env');

const Tanker = require("@tanker/core").default;

const tanker = new Tanker({
    "trustchainId" : process.env.TRUSTCHAIN_ID,
    "PouchDB": PouchDB
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
