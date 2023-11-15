import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import departemenRoute from '../routes/departemen.js';
import employeeRoute from '../routes/employee.js';
import historyRoute from '../routes/history.js';
import jabatanRoute from '../routes/jabatan.js';
import lokasiRoute from '../routes/lokasi.js';
import scwRoute from '../routes/scw.js';
import mesinRoute from '../routes/mesin.js';
import userRoute from '../routes/user.js';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/departemen", departemenRoute);
app.use("/employee", employeeRoute);
app.use("/history", historyRoute);
app.use("/jabatan", jabatanRoute);
app.use("/lokasi", lokasiRoute);
app.use("/scw", scwRoute);
app.use("/mesin", mesinRoute);
app.use("/user", userRoute);

const server = app.listen(process.env.TEST_APP_PORT, () => {
    console.log(`Test server is running on Port ${port} ...`);
});

export { app, server, prisma };
