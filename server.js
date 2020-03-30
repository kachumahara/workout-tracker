//setting up dependencies
const express = require("express");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./models");
const app = express();
// const mongojs = require("mongojs");
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

// using predefined format string'tiny'

// parse requests as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serving static content for app from public __dir
app.use(express.static("public"));

//connection to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

//html routes
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (request, response) => {
  response.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (request, response) => {
  response.sendFile(path.join(__dirname + "/public/stats.html"));
});

//getting Workout Schema from models/workout.js

app.get("/api/workouts", (request, response) => {
  db.Workout.find({})
    .then(dbWorkout => {
      response.json(dbWorkout);
    })
    .catch(error => {
      response.json(error);
    });
});

//creating a new post workout --> post
app.post("/api/workouts", ({ body }, response) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      response.json(dbWorkout);
    })
    .catch(error => {
      response.json(error);
    });
});

// edit existing workout--> put
app.put("/api/workouts/:id", (request, response) => {
  db.Workout.findByIdAndUpdate(
    request.params.id,
    { $push: { exercises: request.body } },
    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      response.json(dbWorkout);
    })
    .catch(error => {
      response.json(error);
    });
});

// getting 7 most recent workouts logged by user
app.get("/api/workouts/range", (request, response) => {
  db.Workout.find()

    .limit(7)
    .then(dbWorkout => {
      response.json(dbWorkout);
    })
    .catch(error => {
      response.json(error);
    });
});
// listen for server connection
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
