import User from "../models/userModel.js";
import session from "express-session";
import bcrypt from "bcrypt";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.session.user_id = user._id;
    res.status(200).json({ message: "Login success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
