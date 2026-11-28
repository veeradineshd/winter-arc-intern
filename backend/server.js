require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const studentsRouter = require('./routes/students');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Student API is running' });
});

app.use('/api/students', studentsRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: 'A student with that email already exists' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to backend/.env.');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exitCode = 1;
});
