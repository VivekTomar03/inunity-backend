const express = require("express");
const NoteModel = require("../models/notes.model");
const { authenticate } = require("../middleware/userAuth");

const noteRouter = express.Router();
noteRouter.post('/create', authenticate, async (req, res) => {
    try {
      const { title, description, color } = req.body;
      const newNote = new NoteModel({
        userId: req.user._id,
        title,
        description,
        color
      });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  noteRouter.get('/', authenticate, async (req, res) => {
    try {
      const notes = await NoteModel.find({ userId: req.user._id });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

noteRouter.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, color } = req.body;
    const note = await NoteModel.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, description, color },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

noteRouter.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findOneAndDelete({ _id: id, userId: req.user._id });  // Ensuring note belongs to the authenticated user
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


  module.exports = {noteRouter};