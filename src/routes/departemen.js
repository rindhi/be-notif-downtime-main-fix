import express from "express";
const route = express.Router();
import { userSession } from "../middleware/middleware.js";
import {
  getDepartemen,
  getDepartemenById,
  updateDepartemen,
  createDepartemen,
  deleteDepartemen,
} from "../controllers/departemen.js";

route.get("/", userSession, getDepartemen);

route.get("/:id_department", userSession, getDepartemenById);

route.post("/", userSession, createDepartemen);

route.patch("/:id_department", updateDepartemen);

route.delete("/:id_department", deleteDepartemen);

export default route;
