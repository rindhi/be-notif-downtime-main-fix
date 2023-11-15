import express from "express";
const route = express.Router();
import { login, logout } from "../controllers/authentication.js";

route.post("/", login);
route.put("/logout", logout);

export default route;
