import express from "express";
const route = express.Router();
import { userSession } from "../middleware/middleware.js";
import {
  getScw,
  getScwById,
  createScw,
  updateScw,
  deleteScw,
} from "../controllers/scw.js";

route.get("/", userSession, getScw);

route.get("/:id_scw", userSession, getScwById);

route.post("/", userSession, createScw);

route.patch("/:id_scw", updateScw);

route.delete("/:id_scw", deleteScw);

export default route;
