const { Schema } = require('mongoose')

const reactionSchema = new Schema({
    reactionId:{
        // Use Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        // Default value is set to a new ObjectId
        default: () => new Types.ObjectId()
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
        get: (date) => {
            if (date) return date.toISOString().split("T")[0];
        }    
    }
}, {
    toJSON: {
        getters: true,
    },
    timestamps: true
});

module.exports = reactionSchema