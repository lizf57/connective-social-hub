// import connection
const connection = require('./config/connection')
const routes = require('./routes')

// express routing
const express = require('express')
const app = express()
const PORT = 3001

// middleware
app.use(express.urlencoded( { extended: true } ))
app.use(express.json())
app.use(routes)

// mongoDB connection
connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});
