const express = require("express");
const {
  getWorkouts,
  getWorkout,
} = require("../controllers/workout.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

module.exports = router;
