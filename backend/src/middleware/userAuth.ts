import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.cookie?.split("=")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const payload = await verifyToken(token);
    req.body.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
