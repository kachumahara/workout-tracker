// creating dependencies

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

//creating workout schema

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now()
    },
    exercise: [
      // defining type, name, duration, weight, reps, sets, distance
      {
        type: {
          type: String,
          trim: true,
          required: "Enter exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter exercise name"
        },
        duration: {
          type: Number,
          required: "Enter exercise duration in minutes"
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  
);
workoutSchema.virtual("totaDuration").get(function(){
  return this.exercises.reduce((total, exercise) => {
    return total+exercise.duration
  }, 0)
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;