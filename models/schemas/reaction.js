const { Schema } = require('mongoose')

const reactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Schema.Types.ObjectId()
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