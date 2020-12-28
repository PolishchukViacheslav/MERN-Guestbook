const { Schema, model } = require('mongoose');

const schema = new Schema({
  author: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},
{
  timestamps: {
    createdAt: 'created_at',
  },
});

module.exports = model('Feedback', schema);