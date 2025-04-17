const mongoose = require('mongoose');

const ScriptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  tone: {
    type: String,
    enum: ['casual', 'professional', 'funny'],
    default: 'casual'
  },
  highlights: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Script = mongoose.model('Script', ScriptSchema);

module.exports = Script;
