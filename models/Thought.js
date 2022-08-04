const {Schema, Model} = require("mongoose");
const moment = require('moment')

// needs to go before ThoughtSchema to use ReactionSchema.
// Reaction Schema 
const ReactionSchema = new Schema({
    reactionId: {

    },

    reactionBody: {
        type: String,
        require: true,
        maxlength: 280
    },

    username: {
        type: String,
        require: true
    },

    createAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    }
});

// Thought Schema
const ThoughtSchema = new Schema({

    thoughtText: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 280
    },

    createdAt: {
        type: Date, 
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },

    username: {
        type: String,
        require: true
    },

    reactions: [ReactionSchema]
})

// get total count of reactions
ThoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = Model('Thought', ThoughtSchema);

// Export Thought Module
module.exports = Thought;
