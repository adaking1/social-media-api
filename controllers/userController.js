const {User, Thought} = require('../models');

module.exports = {
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
    async postNewUser (req,res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
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