const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { issueTypes } = require('./../config/issueTypes');
const { boolean, bool } = require('joi');

const issueSchema = mongoose.Schema({
    reporterId: {
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
    },
    isResolved: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
    });

// add plugin that converts mongoose to json
issueSchema.plugin(toJSON);
issueSchema.plugin(paginate);

/**
 * @typedef Issue
 */
const Issue = mongoose.model('Issue', issueSchema);

module.exports = {
    Issue,
    issueSchema,
};
