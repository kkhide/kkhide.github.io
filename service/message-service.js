const MessageModel = require('../models/message-model');

const MessageService = {
    async getAllMessages() {
        const messages = await MessageModel.find();
        return messages;
    },
    async sendMessages(message, userId) {
        await MessageModel.create({ message, userId });
        const messages = await MessageService.getAllMessages();
        return messages;
    },
};

module.exports = MessageService;
