// connect with mongoose
const mongoose = require('mongoose')

// open connection to the database
mongoose.connect('mongodb://localhost:27017/connective-social-hub', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})


module.exports = mongoose.connection