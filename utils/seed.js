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
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    await Thought.collection.insertMany(thoughts);
    users.forEach((user) => {
        thoughts.forEach((thought) => {
            if (thought.username === user.username) {
                if (!user.thoughts) {
                    user.thoughts = [thought._id];
                }
                else {
                    user.thoughts.push(thought._id);
                }
            }
        });
    });

    await User.collection.insertMany(users);
    console.table(users);



    process.exit(0);
});