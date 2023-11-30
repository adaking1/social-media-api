const {User, Thought} = require('../models');

module.exports = {
    // get route that displays all thoughts
    async getAllThoughts (req,res) {
        try {
            const thought = await Thought.find();
            res.status(200).json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // get route that gets one thought by id 
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
    // post route that creates a new thought
    async postNewThought (req,res) {
        try {
            const thought = await Thought.create(req.body);
            console.log(thought._id);
            const user = await User.findOneAndUpdate(
                {username: thought.username},
                {$addToSet: {thoughts: thought._id}},
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({message: 'user not found'});
                return;
            }
    
            res.status(200).json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // put route that updates a thought by id
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
    // delete route that deletes a thought by id
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
    // post route that creates a reaction to a thought by id
    async postReaction (req,res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
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
    // delete route that deletes reaction by id 
    async deleteReaction (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );
            if (!thought) {
                res.status(404).json({message: 'thought not found'});
                return;
            }
            res.status(200).json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
};