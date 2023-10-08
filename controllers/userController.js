const { User } = require('../models')

const userController = { 
    // /api/users

    // GET all users
    async getAllUsers(req, res){
        try {
            const users = await User.find({})
                .populate({ path: 'friends', select: '-__v' })
                .populate({ path: 'thoughts', select: '-__v' })
 
                return res.json(User)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // GET a single user by its _id and populated thought and friend data
    async getSingleUser(req, res){
        try {
            const user = await User.findOne({ _id: req.params.userId})

            .populate({ path: 'friends', select: '-__v' })
            .populate({ path: 'thoughts', select: '-__v' })
            
            if (!user){
                return res.status(400).json({ message: 'No user with that id'})
            }

            return res.json(user)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    // POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)

            return res.json(user)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    // PUT to update a user by its _id
        // Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
    async updateUser(req, res){
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!user){
                return res.status(404).json({ message: 'No user with this id'})
            }

            res.json(user)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // DELETE to remove user by its _id
        // Remove a user's associated thoughts when deleted
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId});

            if(!user){
                return res.status(404).json({ message: 'No user with this id'}) 
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            return res.status(200).json({ message: 'User and associated thoughts deleted'})
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // api/users/:userId/friends/:friendsId
    // POST to add a new friend to a user's friend list
    async addFriend(req, res){
        try{
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if(!friend){
                return res.status(404).json( { message: 'No user with that id'})
            }

            return res.status(200).json(friend)

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // DELETE to remove a friend from a user's friend list
    async deleteFriend(req, res){
        try{
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if(!friend){
                return res.status(404).json( { message: 'No match with user and friend id'})
            }

            return res.status(200).json(friend)

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }
};

module.exports = userController