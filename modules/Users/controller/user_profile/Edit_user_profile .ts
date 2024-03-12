import { Request, Response } from "express";
import userModel from "../../../../models/user.model";

const EditUserProfile = async (req: Request, res: Response) => {
  const userData = await userModel.findOne({
    auth_id: req?.headers?.authorization?.split(" ")[1] ?? "",
  });

  res.status(200).json({
    message: "welcome to user profile",
    status: "success",
    data: userData,
  });
};
export default EditUserProfile;
