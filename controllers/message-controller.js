const messageService = require('../service/message-service');

const MessageController = {
    async getMessages(req, res, next) {
        try {
            const messages = await messageService.getAllMessages();
            return res.json(messages);
        } catch (e) {
            next(e);
        }
    },
    async sendMessages(req, res, next) {
        try {
            const { message, userId } = req.body;
            const messages = await messageService.sendMessages(message, userId);
            return res.json(messages);
        } catch (e) {
            next(e);
        }
    },
};

module.exports = MessageController;
