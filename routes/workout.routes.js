const express = require("express");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
} = require("../controllers/workout.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

module.exports = router;
