const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const conversationSchema = mongoose.Schema({
    senderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: issueTypes,
    }
},
    {
        timestamps: true,
    });

// add plugin that converts mongoose to json
conversationSchema.plugin(toJSON);
conversationSchema.plugin(paginate);

/**
 * @typedef Conversation
 */
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = {
    Conversation,
    conversationSchema,
};
