import type { Request, Response } from "express";

export const getHome = (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "Welcome to Coverly API" });
};
