import { CookieOptions, Response } from "express";
import { getJWTToken } from "../helpers/getJWTToken";
import { User } from "../types/userTypes";

export const cookieToken = (user: User, res: Response) => {
  const token = getJWTToken(user.id);
  const options: CookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    httpOnly: true,
  };
  user.password = undefined;
  res.status(200).cookie("token", token, options);
  res.json({
    success: true,
    token,
    user,
  });
};
