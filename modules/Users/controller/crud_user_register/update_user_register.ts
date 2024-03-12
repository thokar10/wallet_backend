import { Request, Response } from "express";
import userModel from "../../../../models/user.model";
const updateRegisterData = async (req: Request, res: Response) => {
  const { _id, name, email, password } = req.body;

  await userModel.updateOne(
    {
      _id: _id,
    },
    {
      name: name,
      password: password,
    }
  );

  try {
    res.status(200).json({
      message: " data  update successfully",
      name: name,
      email: email,
      password: password,
    });
  } catch (e) {
    res.status(400).json({
      message: " data  update failed",
    });
  }
};
export default updateRegisterData;
