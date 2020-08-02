let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    posterId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        enum: ["Request", "Offer"],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isReported: {
        type: Boolean,
        default: false
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;