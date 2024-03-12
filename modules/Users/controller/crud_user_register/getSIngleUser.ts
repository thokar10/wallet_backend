import { Request, Response } from "express";
import userModel from "../../../../models/user.model";
const GetSingleUser = async (req: Request, res: Response) => {
  const { user_email } = req.params;
  console.log(user_email);
  try {
    const data = await userModel.findOne({
      email: user_email,
    });

    console.log(data);

    res.status(200).json({
      data: data,
      message: "single user data get successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: "single user data get failed",
    });
  }
};
export default GetSingleUser;
