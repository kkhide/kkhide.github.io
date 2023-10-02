const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    userId: { type: String },
    message: { type: String },
});

module.exports = model('Message', MessageSchema);
