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

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getWorkouts, getWorkout, createWorkout };
