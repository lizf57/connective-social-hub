const { Schema, model } = require('mongoose')

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
        // Use a getter method to format the timestamp on query
    }, 
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
})


const Thought = model('Thought', thoughtSchema)

module.exports = Thought
