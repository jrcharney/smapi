/**
 * @file routes/api/thoughRoutes.js
 * @desc Thought and Reaction routes for the thoughtController
 */
import { Router } from "express";
import thoughtController from "../../controllers/thoughtController.js";

const router = new Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = thoughtController;


/**
 * @path "/api/thoughts"
 * @get  getThought    - get all thoughts
 * @post createThought - create a new thought
 */
router.route("/")
      .get(getThoughts)
      .post(createThought);

/**
 * @path "/api/thoughts/:thoughtId"
 * @get    getSingleThought - get a single thought
 * @put    updateThought    - update a thought
 * @delete deleteThought    - delete a thought
 */
router.route("/:thoughtId")
      .get(getSingleThought)
      .put(updateThought)
      .delete(deleteThought)

/** 
 * @path "/api/thoughts/:thoughtId/reactions"
 * @post addReaction - create a new reaction
 */
router.route("/:thoughtId/reactions")
      .post(addReaction);

/**
 * @path "/api/thoughts/:thoughtId/reactions/:reactionId"
 * @delete removeReaction - delete a reaction
 */
router.route("/:thoughtId/reactions/:reactionId")
      .delete(removeReaction);

export {router as thoughtRoutes};
