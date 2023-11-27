const {User, Thought} = require('../models');

module.exports = {
    async getUsers (req,res) {
        try{
            const users = await User.find();
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async getUserById (req,res) {
        try{
            const user = await User.findOne({_id: req.params.userId});
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
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser (req,res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});
            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            // const userThoughts = await Thought.find
            // find a way to delete users thoughts when user is deleted
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
                {$addToSet: {friends: req.body}},
                { runValidators: true, new: true }
            );
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
    async deletFriend (req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.body}},
                { runValidators: true, new: true }
            );
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