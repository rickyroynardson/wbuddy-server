const express = require("express");
const { getWorkouts } = require("../controllers/workout.controller");

const router = express.Router();

router.get("/", getWorkouts);

module.exports = router;
