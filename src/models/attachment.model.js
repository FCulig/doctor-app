const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const attachmentSchema = mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
attachmentSchema.plugin(toJSON);
attachmentSchema.plugin(paginate);

/**
 * @typedef Attachment
 */
const Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = {
  Attachment,
  attachmentSchema,
};
