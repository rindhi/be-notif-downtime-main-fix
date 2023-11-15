import express from "express";
const route = express.Router();
import { userSession } from "../middleware/middleware.js";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
} from "../controllers/user.js";

route.get("/", userSession, getUser);

route.get("/:id_user", userSession, getUserById);

route.post("/", createUser);

route.patch("/:id_user", updateUser);

export default route;
