import express from "express";
const route = express.Router();
import { userSession } from "../middleware/middleware.js";
import {
  getEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.js";

route.get("/", userSession, getEmployee);

route.get("/:id_employee", userSession, getEmployeeById);

route.post("/", userSession, createEmployee);

route.patch("/:id_employee", updateEmployee);

route.delete("/:id_employee", deleteEmployee);

export default route;
