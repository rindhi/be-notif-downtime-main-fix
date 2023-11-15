import express from "express";
const route = express.Router();
import { userSession } from "../middleware/middleware.js";
import {
  getJabatan,
  getJabatanById,
  updateJabatan,
  createJabatan,
  deleteJabatan,
} from "../controllers/jabatan.js";

route.get("/", userSession, getJabatan);

route.get("/:id_jabatan", userSession, getJabatanById);

route.post("/", userSession, createJabatan);

route.patch("/:id_jabatan", updateJabatan);

route.delete("/:id_jabatan", deleteJabatan);

export default route;
