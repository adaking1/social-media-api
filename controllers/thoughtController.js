const {User, Thought} = require('../models');

module.exports = {
    async getAllThoughts (req,res) {
        try {
            const thought = await Thought.find();
            res.status(200).json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async getThoughtById (req,res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId});
            if (!thought) {
                res.status(404).json({message: 'thought not found'});
                return;
            }
            res.status(200).json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async postNewThought (req,res) {
        try {
            const thought = await Thought.create(req.body);
            // const user = await User.findOneAndUpdate(
            //     {username: thought.username},
            //     {$addToSet: thought}
            //     );
            // need to test. trying to add new thought to user's thought array
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if (!thought) {
                res.status(404).json({message: 'no thought found'});
                return;
            }
            res.status(200).json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought (req,res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
            if (!thought) {
                res.status(404).json({message: 'thought not found'});
                return;
            }
            res.status(200).json({message: 'Thought deleted'});
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async postReaction (req,res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                { runValidators: true, new: true }
            );
            if (!reaction) {
                res.status(404).json({message: 'thought not found'});
                return;
            }            
            res.status(200).json(reaction);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction (req,res) {
        try {
            const reaction = findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: req.body.reactionId}}
            );
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
};