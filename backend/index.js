import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routes/userRoute.js";
import session from "express-session";
import flash from "connect-flash";

const app = express();
const secret = "keyboard cat";

mongoose.connect("mongodb://localhost:27017/fullStack_db");

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected"));

app.use(
  cors({
    origin: "http://localhost:5173", // Ganti dengan URL frontend Anda
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.succes_create_message = req.flash("succes_create_message");
  res.locals.success_update_message = req.flash("success_update_message");
  res.locals.success_delete_message = req.flash("success_delete_message");
  next();
});

app.use(UserRoute);

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
});
