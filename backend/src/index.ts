import express, { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import apiRouter from './routes/index';
import cors from 'cors';
import accountRouter from './routes/account';
 

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

app.use("/api/v1/user",apiRouter);
app.use("/api/v1/account",accountRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});