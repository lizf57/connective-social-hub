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
        // TO DO: Use a getter method to format the timestamp on query
    }, 
    username: {
        type: String,
        required: true,
    },
    // reactions: Array of nested documents created with the reactionSchema
})


const Thought = model('Thought', thoughtSchema)

module.exports = Thought
