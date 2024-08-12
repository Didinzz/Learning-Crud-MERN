import express from "express";
import {
  getUsers,
  getUserId,
  addUser,
  UpdateUser,
  deleteUser,
} from "../controller/userController.js";
import { login, logout } from "../controller/authController.js";
import auth from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", login);

router.get("/logout", logout);

router.get("/user", auth, getUsers);

router.get("/user/:id", getUserId);

router.post("/user", addUser);

router.patch("/user/:id", UpdateUser);

router.delete("/user/delete/:id", deleteUser);

export default router;
