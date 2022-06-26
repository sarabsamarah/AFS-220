const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Comment Blueprint
const votesSchema = new Schema({
    vote: {
        type: String,
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Votes', votesSchema)
