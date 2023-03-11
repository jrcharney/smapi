/**
 * @file models/reaction.js
 * @desc the model for Reactions
 * Not really a model, but will be used in the `reaction` field in `Thought`.
 */
import { Schema, Types } from "mongoose";

const reactionSchema = new Schema({
    // Schema
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        // minlength: 1,
        maxlength: 280,     // 280 character limit
    },
    username: {
        type: String,
        require: true
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
},{
    // Options
    toJSON: {
        getters: true
    },
    id: false
});

// We only need to export the reactionSchema
export default reactionSchema;
