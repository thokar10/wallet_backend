import { NextFunction } from "express";
import { Request, Response } from "express";

const ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    if (typeof error === "string") {
      res.status(400).json({
        message: error,
      });
    } else {
      res.status(400).json({
        message: "something went wrong",
      });
    }
  } else {
    next();
  }
};

export default ErrorHandler;
