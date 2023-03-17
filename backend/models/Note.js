const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:  {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    colour: {
        type: String,
        default: "Blank"
    },
    isPinned:{
        type: Boolean,
        default: false
    },
    dateCreated:{
        type: Date,
        required: true
    },
    dateModified:{
        type: Date,
        required: true
    },
  });

  module.exports = mongoose.model('note', NoteSchema);