const connection = require('../config/connection');
const {User, Thought} = require('../models');
const users = require('./userData');
const thoughts = require('./thoughtData');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    let userCheck = await connection.db.listCollections({name: 'users'}).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    let thoughtCheck = await connection.db.listCollections({name: 'thoughts'}).toArray();
    if (!thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    await User.collection.insertMany(users);
    console.log(users);

    await Thought.collection.insertMany(thoughts);
    console.log(thoughts);

    process.exit(0);
});