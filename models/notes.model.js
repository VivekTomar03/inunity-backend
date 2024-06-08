// models/Note.model.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#ffffff' 
  },
}, {
  timestamps: true 
});

const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel;
