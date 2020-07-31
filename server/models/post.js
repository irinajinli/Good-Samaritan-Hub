let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = Schema({
    title: String,
    body: String,
    posterId: {
        type: Schema.Types.ObjectId
    },
    type: {
        type: String,
        enum: ["Request", "Offer"]
    },
    date: Date,
    status: {
        type: String,
        enum: ["active", "inactive"]
    },
    location: 'M4P'
});

mongoose.model("Post", postSchema);