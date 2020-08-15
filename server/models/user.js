const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    username: {
        type: String,
        required: true
    }, 
    lastMessageTime: {
        type: Date,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId, 
    }
});

const UserSchema = new Schema({
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
    isReported: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    banReason: {
        type: String,
        default: ''
    },
    postsHiddenFromUser: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    conversations: {
        type: [conversationSchema],
        default: []
    }   
});

const User = mongoose.model('User', UserSchema);

module.exports = User;