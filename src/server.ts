import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from "./routes";
import './database';
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(3000, () => console.log('Server is running.'));