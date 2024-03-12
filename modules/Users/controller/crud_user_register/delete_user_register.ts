import { Request, Response } from "express";
import userModel from "../../../../models/user.model";
const deleteRegisterData = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  console.log(user_id);

  await userModel.deleteOne({
    _id: user_id,
  });

  try {
    res.status(200).json({
      message: "   delete successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: " delete   failed",
    });
  }
};
export default deleteRegisterData;
