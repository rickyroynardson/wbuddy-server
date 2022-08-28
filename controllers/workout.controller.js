const mongoose = require("mongoose");
const Workout = require("../models/workout.model");

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({ user_id: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout!" });
  const workout = await Workout.findById(id);
  if (!workout) return res.status(404).json({ error: "No such workout!" });
  res.status(200).json(workout);
};

module.exports = { getWorkouts, getWorkout };
