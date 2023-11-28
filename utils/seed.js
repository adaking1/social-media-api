const connection = require('../config/connection');
const {User, Thought} = require('../models');

connection.on('error', (err) => err);

connection.once('on', async () => {
    let userCheck = await connection.db.listCollections({name: 'users'}).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    let thoughtCheck = await connection.db.listCollections({name: 'thoughts'}).toArray();
    if (!thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    const users = [];

    
});