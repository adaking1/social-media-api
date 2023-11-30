const {Schema, model} = require('mongoose');

// schema for user
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'invalid email']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
        virtuals: true
        },
        id: false
    }
);

// virtual method for user schema that returns length of friends list
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// instatiates user model using user schema
const User = model('user', userSchema);

module.exports = User;