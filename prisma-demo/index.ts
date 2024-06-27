import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { router as userRouter } from "./routes/user";

const app = express();
const port = 5000;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser());
app.use("/user", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
