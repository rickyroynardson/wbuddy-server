const User = require("../models/user.model");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.register(email, password);
    res.status(200).json({ message: "Register berhasil!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
