const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({ // TODO: not completed
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    messagesSent: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    messagesRecieved: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    isReported: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    reportedMessages: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    banReason: {
        type: String,
        default: ''
    },
    postsHiddenFromUser: {
        type: [Schema.Types.ObjectId],
        default: []
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;