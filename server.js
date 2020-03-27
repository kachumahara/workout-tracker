//setting up dependencies
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const Workout = require('./models/workout.js');
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));
//connection to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});
