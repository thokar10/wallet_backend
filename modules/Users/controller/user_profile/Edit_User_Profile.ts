import { Request, Response } from "express";
import userModel from "../../../../models/user.model";
const EditUserProfile = async (req: any, res: Response) => {
  console.log(req.user.user_id);
  const { name, phone_no, location } = req.body;

  const updateUser = await userModel.updateOne(
    {
      _id: req.user.user_id,
    },
    {
      name,
      phone_no,
      location,
    }
  );

  if (!updateUser) throw "Edit Failed";

  res.status(200).json({
    message: "Edit successfully",
  });
};
export default EditUserProfile;
