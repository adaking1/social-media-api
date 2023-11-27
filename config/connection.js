const {connect, connection} = require('mongoose');

const connectString = 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connectString);

module.exports = connection;