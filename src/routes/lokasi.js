import express from "express";
const route = express.Router();
import { userSession } from "../middleware/middleware.js";
import {
  getLokasi,
  getLokasiById,
  updateLokasi,
  createLokasi,
  deleteLokasi,
} from "../controllers/lokasi.js";

route.get("/", userSession, getLokasi);

route.get("/:id_lokasi", userSession, getLokasiById);

route.post("/", userSession, createLokasi);

route.patch("/:id_lokasi", updateLokasi);

route.delete("/:id_lokasi", deleteLokasi);

export default route;
