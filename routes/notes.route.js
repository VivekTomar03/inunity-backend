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
  module.exports = {noteRouter};