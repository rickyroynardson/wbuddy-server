const express = require("express");
const { getWorkouts } = require("../controllers/workout.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);

module.exports = router;
