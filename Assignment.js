const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/webtoonsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Define Webtoon Schema
const webtoonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  characters: [{ name: String, role: String }],
});

// Create Webtoon model
const Webtoon = mongoose.model('Webtoon', webtoonSchema);
