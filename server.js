// import connection
const connection = require('./config/connection')
const { User, Thought } = require('./models')
const routes = require('./routes')

// express routing
const express = require('express')
const app = express()
const port = 3001

// middleware
app.use(express.urlencoded( { extended: true } ))
app.use(express.json())
app.use(routes)

// mongoDB connection
const { MongoClient } = require('mongodb')

// app.listen(PORT, () => {})