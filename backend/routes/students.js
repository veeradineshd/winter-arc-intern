const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/Student');

const router = express.Router();
const allowedFields = new Set(['name', 'email', 'course']);

function isValidStudentId(id) {
  return mongoose.isValidObjectId(id);
}

function pickStudentFields(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return null;
  }

  const keys = Object.keys(body);
  if (keys.length === 0 || keys.some((key) => !allowedFields.has(key))) {
    return null;
  }

  return body;
}

router.get('/', async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
});

router.get('/:id', async (req, res) => {
  if (!isValidStudentId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  return res.json(student);
});

router.post('/', async (req, res) => {
  const fields = pickStudentFields(req.body);
  if (!fields || !fields.name || !fields.email) {
    return res.status(400).json({
      error: 'Provide name and email, and only the fields name, email, and course',
    });
  }

  const student = await Student.create(fields);
  return res.status(201).json(student);
});

router.patch('/:id', async (req, res) => {
  if (!isValidStudentId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  const fields = pickStudentFields(req.body);
  if (!fields) {
    return res.status(400).json({
      error: 'Provide at least one of name, email, or course, and no other fields',
    });
  }

  const student = await Student.findByIdAndUpdate(req.params.id, fields, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  return res.json(student);
});

router.delete('/:id', async (req, res) => {
  if (!isValidStudentId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  return res.json({ message: 'Student deleted', student });
});

module.exports = router;
