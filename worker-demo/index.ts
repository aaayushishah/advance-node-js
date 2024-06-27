import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import zlib from "zlib";
import status from "express-status-monitor";
import { Worker } from "worker_threads";
const { calcFactorial } = require("./factorial");
dotenv.config();

const app: Express = express();
app.use(status());

const port = process.env.PORT || 3000;
app.get("/factorial", (req: Request, res: Response) => {
  const { value } = req.query;
  const factorial = calcFactorial(value as unknown as number);
  res.send(`Factorial is ${factorial}`);
});

app.get("/worker", (req: Request, res: Response) => {
  const { value } = req.query;
  const factorialWorker = new Worker("./factorial.js");
  factorialWorker.postMessage(value);
  factorialWorker.once("message", (result) => {
    console.log(result);
    res.send("Completed: ");
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export {};
