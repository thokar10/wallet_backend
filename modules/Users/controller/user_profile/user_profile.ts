import { Request, Response } from "express";
import userModel from "../../../../models/user.model";
import jwt from "jsonwebtoken";

const userProfile = async (req: any, res: Response) => {
  console.log(req.user);

  const userData = await userModel.findOne({
    _id: req.user.user_id,
  });

  res.status(200).json({
    message: "welcome to user profile",
    status: "success",
    userInfo: userData,
  });
};
export default userProfile;
