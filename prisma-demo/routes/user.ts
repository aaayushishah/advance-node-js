import express, { NextFunction, Request, Response } from "express";
import { signUp } from "../controller/user";
export const router = express.Router();

router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
  signUp(req, res, next);
});
