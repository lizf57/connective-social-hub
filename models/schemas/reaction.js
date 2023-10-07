const { Schema } = require('mongoose')

const reactionSchema = new Schema({
    reactionId:{
        // TODO:Use Mongoose's ObjectId data type
        // TODO:Default value is set to a new ObjectId
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
        // TODO:Use a getter method to format the timestamp on query
    }
})

// TODO:This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.


module.exports = reactionSchema