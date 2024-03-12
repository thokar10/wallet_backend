import { Request, Response } from "express";
import userModel from "../../../../models/user.model";
const getRegisterData = async (req: Request, res: Response) => {
  const data = await userModel.find().select("+password");

  try {
    res.status(200).json({
      message: " data  get successfull",
      number: data.length,
      data: data,
    });
  } catch (e) {
    res.status(400).json({
      message: " data  get failed",
    });
  }
};
export default getRegisterData;
