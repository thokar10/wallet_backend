import { NextFunction } from "express";
import { Request, Response } from "express";
import userModel from "../../../models/user.model";
import jwt from "jsonwebtoken";

const auth_id = async (req: any, res: Response, next: NextFunction) => {
  console.log(req.headers);

  if (!req.headers.authorization) throw "Authorization failed";

  console.log(req.headers.authorization);

  const payload = req.headers.authorization.split(" ")[1];

  try {
    const access_token = jwt.verify(payload, process.env!.secret_key!);

    console.log(access_token);
    req.user = access_token;
  } catch (e) {
    throw "Authorization error ! JWT mismatch";
  }

  next();
};

export default auth_id;
