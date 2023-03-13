/**
 * @file controllers/thoughtController.js
 * @desc Controller for Thought model
 * "We don't need no thought control!" :3
 */
import { User, Thought } from "../models/index.js";

const thoughtController = {
    /**
     * @func getThoughts
     * @param {Request} req 
     * @param {Response} res
     * @desc Read thoughts (GET OUT OF MY HEAD!) :3 
     */
    getThoughts(req,res){
        Thought
            .find()                     // We shouldn't need an argument here
            .then((thoughts) => {
                res.status(200).json(thoughts);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func getSingleThought
     * @param {Request} req 
     * @param {Response} res 
     * @desc Read a single thought
     */
    getSingleThought(req,res){
        // Alternatively: `Thought.findById(req.params.thoughtId)`
        Thought
            .findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) => {
                if(thought){
                    res.status(200).json(thought);
                }else{
                    res.status(404).json({
                        message: "Sorry. No thought found with that id."
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func createThought
     * @param {Request} req 
     * @param {Response} res
     * @desc Create a thought
     */
    createThought(req,res){
        Thought
            .create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { 
                        runValidators: true,
                        new: true 
                    }
                );
            })
            .then((user) => {
                // TODO: Should this be first so that a Thought is not created if the User does not exist?
                if(user){
                    // TODO: What status should I use? 200?
                    //res.status(200).json(user);
                    res.json({message: "Thought successfully created."})
                }else{
                    res.status(404).json({
                        message: "Sorry. No user found with that id. But Thought still created."
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func updateThought
     * @param {Request} req 
     * @param {Response} res
     * @desc Update a thought 
     */
    updateThought(req,res){
        Thought
            .findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                {
                    runValidators: true,
                    new: true
                }
            )
            .then((user) => {
                if(user){
                    res.status(200).json(user);
                }else{
                    res.status(404).json({
                        message: "Sorry. No user found with that id."
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    /**
     * @func deleteThought
     * @param {Request} req 
     * @param {Response} res
     * @desc Delete a thought 
     */
    deleteThought(req,res){
        Thought
            .findOneAndDelete({
                _id: req.params.thoughtId
            })
            .then((thought) => {
                if(thought){
                    User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
                }else{
                    res.status(404).json({
                        message: "No though found with that ID. It was going to be deleted anyway."
                    });
                }  
            })
            .then((user) => {
                if(user){
                    // TODO: Is this a `.status(200)`?
                    res.json({ message: "Thought successfully deleted." });
                }else{
                    res.status(404).json({
                        message: "Thought deleted, but there's no use with that ID."
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func addReaction
     * @param {Request} req 
     * @param {Response} res 
     * @desc create a reaction
     */
    addReaction(req,res){
        Thought
            .findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                {
                    runValidators: true,
                    new: true 
                }
            )
            .then((thought) => {
                if(thought){
                    // TODO: Is this a `.status(200)`?
                    res.json(thought);
                }else{
                    res.status(404).json({
                        message: "Sorry. No thought found with that ID."
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    /**
     * @func removeReaction
     * @param {Request} req 
     * @param {Response} res
     * @desc delete a reaction 
     */
    removeReaction(req,res){
        Thought
        .findOneAndDelete(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            {
                runValidators: true,
                new: true 
            }
        )
        .then((thought) => {
            if(thought){
                // TODO: Is this a `.status(200)`?
                res.json(thought);
            }else{
                res.status(404).json({
                    message: "Sorry. No thought found with that ID."
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}

export default thoughtController;
// "Hey! Teacher! Leave those kids alone!"
