const { Schema } = require('mongoose')

const reactionSchema = new Schema({
    reactionId:{
        // Use Mongoose's ObjectId data type
        // Default value is set to a new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
    }
})

module.exports = reactionSchema