/**
 * @file routes/api/userRoutes.js
 * @desc User routes for the userController
 */
import { Router } from "express";
import userController from "../../controllers/userController.js"

const router = new Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = userController;

/**
 * @path "/api/users"
 * @get  getUsers   - get a list of Users
 * @post createUser - create a new user
 */
router.route("/")
      .get(getUsers)
      .post(createUser);

/** 
 * @path   "/api/users/:userId"
 * @get    getSingleUser - get a user
 * @put    updateUser    - update a user
 * @delete deleteUser    - delete a user
 */
router.route("/:userId")
      .get(getSingleUser)
      .put(updateUser)
      .delete(deleteUser);

/**
 * @path "/api/users/:userId/friends/:friendId"
 * @post   addFriend    - create a new friend
 * @delete removeFriend - delete a friend
 */
router.route("/:userId/friends/:friendId")
      .post(addFriend)
      .delete(removeFriend);

export {router as userRoutes};
