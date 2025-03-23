import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req);

  if (err.stack) {
    console.error(err.stack);

    res.status(500).json({ message: "Something went wrong!" });
  }
  return next();
};
