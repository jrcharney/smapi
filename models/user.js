/**
 * @file models/user.js
 * @desc the model for Users
 */
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    // Schema
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.\..+/, "Please enter a valid email"]       // TODO: be more specific with this filter
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},{
    // Options
    toJSON: {
        virtuals: true      // Include virtuals in the response
    },
    id: false
});

// Create a virtual named `friendCount` that returns the length of the user's array of friends.
// NOTE: We can't use the Arrow syntax here because we need to use `this`.
userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
});

// Use `mongoose.model` to create a model `user` based on our `userSchema`.
const User = model("User", userSchema);

export default {User};