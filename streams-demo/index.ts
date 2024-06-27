import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import zlib from "zlib";
import status from "express-status-monitor";

dotenv.config();

const app: Express = express();
app.use(status());

const port = process.env.PORT || 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.get("/data", (req: Request, res: Response) => {
  const stream = fs.createReadStream("test1.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});
app.get("/zipfile", (req: Request, res: Response) => {
  const stream = fs
    .createReadStream("test1.txt")
    .pipe(zlib.createGzip().pipe(fs.createWriteStream("test11.zip")));
  stream.on("end", () => res.end());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
