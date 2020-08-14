const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    username: {
        type: String,
        required:true
    }, 
    name: {
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
})
const conversationsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    conversations: [conversationSchema]
});

const Conversation = mongoose.model('Conversation', conversationsSchema);

module.exports = Conversation;

// const conversations = [
//     { username: 'user2', name: 'Bobsy Bob', image: 'https://picsum.photos/70', lastMessageTime: 1593648000 },
//     { username: 'user3', name: 'Diane Doe', image: 'https://picsum.photos/70', lastMessageTime: 1593646000 },
//     { username: 'user4', name: 'Jack Scott', image: 'https://picsum.photos/70', lastMessageTime: 1593644000 },
//   ];