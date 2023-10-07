// connect with mongoose
const mongoose = require('mongoose')

// open connection to the database
const connection = mongoose.connect('mongodb://127.0.0.1:27017/connective-social-hub')




module.exports = connection