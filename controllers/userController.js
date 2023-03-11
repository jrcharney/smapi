/**
 * @file controllers/userController.js
 * @desc controller for the User model
 * TODO: Think about creating a friendSchema
 */
import { User, Thought } from "../models";

const userController = {
    /**
     * @func getUsers
     * @param {Request} req 
     * @param {Response} res 
     * @desc Read a list of Users
     */
    getUsers(req,res){
        User.find()
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func getSingleUser
     * @param {Request} req 
     * @param {Response} res 
     * @desc Read a User
     */
    getSingleUser(req,res){
        User.findOne({ _id: req.params.userId })
            .populate("thoghts")
            .populate("friends")
            .select("-__v")
            .then((user) => {
                if(user){
                    res.json(user);
                }else{
                    res.status(404).json({
                        message: "Sorry. No user with that ID."
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func createUser
     * @param {Request} req 
     * @param {Response} res 
     * @desc Create a User
     */
    createUser(req,res){
        User.create(req.body)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func updateUser
     * @param {Request} req 
     * @param {Response} res 
     * @desc Update a User
     */
    updateUser(req,res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {
                runValidators: true,
                new: true 
            })
            .then((user) => {
                if(user){
                    res.json(user);
                }else{
                    res.status(404).json({
                        message: "Sorry. No user with that ID."
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func deleteUser
     * @param {Request} req 
     * @param {Response} res 
     * @desc Delete a User
     * Note: We need to delete the user's associated thoughts too
     */
    deleteUser(req,res){
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if(user){
                    //res.json(user);
                    Thought.deleteMany({ _id: { $id: user.thoughts } })     // [Men in black neuralizer sounds]
                }else{
                    res.status(404).json({
                        message: "Sorry. No user with that ID."     // We don't know who you're talking about.
                    });
                }
            })
            .then(() => {
                // TODO: What status message could we return?
                res.json({
                    message: "User and Thought deleted!"        // You saw nothing!
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func addFriend
     * @param {Request} req 
     * @param {Response} res 
     * @desc Create a friend
     */
    addFriend(req,res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            {
                runValidators: true,
                new: true 
            })
            .then((user) => {
                if(user){
                    res.json(user);
                }else{
                    res.status(404).json({
                        message: "Sorry. No user with that ID."     // New friend, who this?
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    /**
     * @func removeFriend
     * @param {Request} req 
     * @param {Response} res 
     * @desc Delete a friend
     */
    removeFriend(req,res){
        // Note: Not `.findOneAndDelete`
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true })
            .then((user) => {
                if(user){
                    res.json(user);
                }else{
                    res.status(404).json({
                        message: "Sorry. No user with that ID."     // You were going to unfriend them anyway
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

export default userController;
