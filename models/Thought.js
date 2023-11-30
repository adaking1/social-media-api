const {Schema, model, Types} = require('mongoose');

// schema for reactions
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (date) {
                return date.toLocalString('en-US', {timeZoneName: 'short'});
            }
        }
    }
);

// schema for thoughts
const thoughtSchema = new Schema ( 
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (date) {
                return date.toLocalString('en-US', {timeZoneName: 'short'});
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// virtual method for thought schema that returns length of reactions list
thoughtSchema.virtual('reactionCount').get(function () {
    if (!this.reactions) {
        return 0;
    }
    return this.reactions.length;
});

// instantiates thought model using thought schema
const Thought = model('thought', thoughtSchema);

module.exports = Thought;