const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema({
    messageSender: {
        type: String,
        required: true
    },
    messageReceiver: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
    messageContent: {
        type: String,
        required: true
    },
    isReported: {
        type: Boolean,
        default: false
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
