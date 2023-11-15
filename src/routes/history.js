import express from "express";
const route = express.Router();
import { userSession } from "../middleware/middleware.js";
import {
  getHistory,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
} from "../controllers/history.js";

route.get("/", userSession, getHistory);

route.get("/:id_kerusakan", userSession, getHistoryById);

route.post("/", userSession, createHistory);

route.patch("/:id_kerusakan", updateHistory);

route.delete("/:id_kerusakan", deleteHistory);

export default route;
