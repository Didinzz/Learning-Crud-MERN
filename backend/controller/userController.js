import User from "../models/userModel.js";
import session from "express-session";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const message = req.flash("success_create_message") || "";
    return res.json({ users, message });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    // hashing password
    const pass = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      gender,
      password: pass,
    });

    const newUser = await user.save();
    req.flash("succes_create_message", "User created successfully");
    res
      .status(201)
      .json({ user: newUser, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update user
export const UpdateUser = async (req, res) => {
  try {
    const editUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ user: editUser, message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    req.flash("success_delete_message", "User deleted successfully");
    res
      .status(200)
      .json({ user: deletedUser, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
