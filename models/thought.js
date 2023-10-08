const { Schema, model } = require('mongoose')
const reactionSchema = require('./schemas/reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
        // TODO: Use a getter method to format the timestamp on query
    }, 
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// initialize Thought model 
const Thought = model('Thought', thoughtSchema)

module.exports = Thought
