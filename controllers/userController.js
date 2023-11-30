const {User, Thought} = require('../models');

module.exports = {
    // get route that displays all users
    async getUsers (req,res) {
        try{
            const users = await User.find();
            res.status(200).json(users);
        }
        catch (err) {
            console.error({message:err});
            res.status(500).json(err);
        }
    },
    // get route that gets one user by id
    async getUserById (req,res) {
        try{
            const user = await User.findOne({_id: req.params.userId}).populate('thoughts');
            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // post route that creates a new user
    async postNewUser (req,res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // put route that updates a users info by id
    async updateUser (req,res) {
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({message: 'no user found'})
            }
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // delete route that deletes a user and their associated thoughts
    async deleteUser (req,res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});
            const thoughts = await Thought.deleteMany({username: user.username});
            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.status(200).json({message: 'User and all data deleted'});
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // post route that adds a new friend by friendId to the user's friend list by userId
    // it also adds the user to the friend's friend list
    async addNewFriend (req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId}, 
                {$addToSet: {friends: req.params.friendId}},
                { runValidators: true, new: true }
            );
            const friend = await User.findOneAndUpdate(
                {_id: req.params.friendId}, 
                {$addToSet: {friends: req.params.userId}},
                { runValidators: true, new: true }
            )
            if (!friend) {
                res.status(404).json({message: 'user not found'});
                return;
            }
            if (!user) {
                res.status(404).json({message: 'user not found'});
                return;
            }
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // delete route that deletes a friend by id from a user's friend list
    async deleteFriend (req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            );
            const friend = await User.findOneAndUpdate(
                {_id: req.params.friendId},
                {$pull: {friends: req.params.userId}},
                {runValidators: true, new: true}
            );
            if (!friend) {
                res.status(404).json({message: 'user not found'});
            }
            if (!user) {
                res.status(404).json({message: 'user not found'});
                return;
            }
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
};