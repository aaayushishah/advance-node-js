import { NextFunction, Request, Response } from "express";
import { SIGNUP_USER_FIELDS_ERROR } from "../constants/messages";
import { prisma } from "../prisma";
import { cookieToken } from "../utils/cookieToken";
import { User } from "../types/userTypes";

// Signup
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    console.log({ name, email, password });
    if (!name || !email || !password) {
      throw new Error(SIGNUP_USER_FIELDS_ERROR);
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    console.log("user:", user);
    // send user a token
    cookieToken(user as User, res);
  } catch (error: unknown) {
    console.log("error: ", error);
    throw new Error(error as string | undefined);
  }
};
