import express from "express";
const route = express.Router();
import { userSession } from "../middleware/middleware.js";
import {
  getMesin,
  getMesinById,
  createMesin,
  updateMesin,
  deleteMesin,
} from "../controllers/mesin.js";

route.get("/", userSession, getMesin);

route.get("/:id_mesin", userSession, getMesinById);

route.post("/", userSession, createMesin);

route.patch("/:id_mesin", updateMesin);

route.delete("/:id_mesin", deleteMesin);

export default route;
