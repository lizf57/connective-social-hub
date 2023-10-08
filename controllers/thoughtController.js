const { User, Thought } = require('../models')

const thoughtController = {
    // GET all thoughts
    async getAllThoughts(req, res){
        try {
            const thoughts = await Thought.find()

            return res.json(thoughts)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // GET a single thought by its _id
    async getSingleThought(req, res){
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if(!thought){
            return res.status(404).json( { message: 'No thought with this id' })
        }

        return res.json(thought)

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }  
    },
    // POST to create a new thought
        // push created thoughts `__id `to the associated user's `thoughts` array field
    async createThought(req, res){
        try {
            const thought = await Thought.create(req.body);
            
            const user = await User.findByIdAndUpdate(
                { _id: req.body.userId},
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true}
            );

            if (!user){
                return res.status(404).json( { message: 'Thought created, but found no user with that ID'})
            }

            return res.status(200).json( { thought, user })

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // PUT to update a thought by its _id
    async updateThought(req, res){
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!thought){
                return res.status(404).json( { message: 'No thought with this id'})
            }

            return res.status(200).json(thought)

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // DELETE to remove a thought by its _id
    async deleteThought(req, res){
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thought.id });

            if(!thought){
                return res.status(404).json( { message: 'No thought with this id'})
            }

            return res.status(200).json({ message: 'Thought successfully deleted'})

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // POST to create a reaction stored in a single thoughts reaction array field
    async createReaction(req, res){
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true }
            );

            if(!reaction){
                return res.status(404).json( { message: 'No thought with this ID '} )
            }

            return res.status(200).json(reaction)

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // DELETE to pull and remove a reaction by the reactions reactionId value
    async deleteReaction(req, res){
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reaction: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if(!reaction){
                return res.status(404).json({ message: 'No match with reaction and thought id'})
            }

            return res.status(200).json(reaction)

        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }
};

module.exports = thoughtController