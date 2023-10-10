// connect with mongoose
const mongoose = require('mongoose')

// open connection to the database
mongoose.connect('mongodb://127.0.0.1:27017/connective-social-hub')


module.exports = mongoose.connection