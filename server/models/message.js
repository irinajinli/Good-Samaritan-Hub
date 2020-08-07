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
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

// const messages = [
//     { messageId: 0, messageSender: 'user', messageReceiver: 'user2', date: '1593648000', messageContent: 'Hi Bobsy' },
//     { messageId: 1, messageSender: 'user2', messageReceiver: 'user', date: '1593648000', messageContent: 'Hi John' },
//     { messageId: 2, messageSender: 'user', messageReceiver: 'user2', date: '1593648000', messageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { messageId: 3, messageSender: 'user2', messageReceiver: 'user', date: '1593648000', messageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { messageId: 4, messageSender: 'user', messageReceiver: 'user3', date: '1593648000', messageContent: 'Hello Diane' },
//     { messageId: 5, messageSender: 'user3', messageReceiver: 'user', date: '1593648000', messageContent: 'Hello John' },
//     { messageId: 6, messageSender: 'user', messageReceiver: 'user4', date: '1593648000', messageContent: 'Greetings Jack' },
//     { messageId: 7, messageSender: 'user4', messageReceiver: 'user', date: '1593648000', messageContent: 'Greetings John' },
//     { messageId: 8, messageSender: 'user6', messageReceiver: 'user7', date: '1593648000', messageContent: 'Hello' },
//   ];