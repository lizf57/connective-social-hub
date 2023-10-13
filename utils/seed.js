const connection = require('../config/connection')
const { User, Thought } = require('../models')
const userData = require('./userData.json')

const thoughtData = require('./thoughtData.json')

connection.once('open', async () => {
    try {
        
        await User.deleteMany({})
        await Thought.deleteMany({})

        const users = await User.create(userData)
            console.log(users)
            console.log("Users seeded")
        

        for (const thought of thoughtData) {
        // get random user
        const randomIndex = Math.floor(Math.random * users.length) 
        const randomUser = users[randomIndex]
        // add username to thought object
        const thoughtUsername = {...thought, username: randomUser.username}
        // create thought in DB
        const newThought = await Thought.create(thoughtUsername)
        // update user with new thought ID
        await User.findByIdAndUpdate(randomUser._id, {$push: {thoughts: newThought._id}})
        }

        console.log('Thoughts seeded')
        process.exit(0)

    } catch(err) {
        console.log(err)
        process.exit(1)
    }
})