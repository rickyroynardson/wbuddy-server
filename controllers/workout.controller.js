const mongoose = require("mongoose");
const Workout = require("../models/workout.model");

const getWorkouts = async (req, res) => {
  // const workouts = await Workout.find({ user_id: req.user._id }).sort({
  //   createdAt: -1,
  // });
  const workouts = await Workout.find();
  res.status(200).json(workouts);
};

module.exports = { getWorkouts };
