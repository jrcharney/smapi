/**
 * @file models/thought.js
 * @desc the model for Thoughts
 */
import { Schema, model } from "mongoose";
import { reactionSchema } from "./reaction.js";

const thoughtSchema = new Schema({
    // Schema
    thoughText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,     // 280 character max limit
    },
    createdAt: {
        type: Date,
        // Set the default value to the current timestamp
        default: Date.now,
        // Getter to format the timestamp (ts) on query
        get: (ts) => {
            if(ts){
                return ts.toLocaleDateString()
            }
        }
    },
    // TODO: modifiedAt?
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]     // reactions
},{
    // Options
    toJSON: {
        virtuals: true      // Include virtuals in the response
    },
    id: false
});

// Create a virtual named `reactionCount` that returns the length of the thought's array of reactions.
// NOTE: We can't use the Arrow syntax here because we need to use `this`.
thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

// Use `mongoose.model` to create a model `user` based on our `userSchema`.
const Thought = model("Thought",thoughtSchema);

export default {Thought};
