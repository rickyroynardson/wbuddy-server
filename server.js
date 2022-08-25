require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout.routes");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to workout buddy server API",
  });
});

app.use("/workout", workoutRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.EXPRESS_PORT, () => {
      console.log(
        `Connected to mongodb & listening on port ${process.env.EXPRESS_PORT}...`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
