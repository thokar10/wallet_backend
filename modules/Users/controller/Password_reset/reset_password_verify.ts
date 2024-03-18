import { Request, Response } from "express";

import userModel from "../../../../models/user.model";
import { v4 as uuidv4 } from "uuid";

const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const uuid = uuidv4();
  const shortUuid = uuid.substring(0, 6);

  console.log(shortUuid);

  console.log(req.body);

  if (!email) throw "Email is required";

  const findUser = await userModel.updateOne(
    {
      email,
    },
    {
      reset_password_token: shortUuid,
    }
  );

  if (!findUser) throw "User doesn't exist";

  res
    .status(200)
    .json({ message: "You are allowed to change password", OTP: shortUuid });
};

export default resetPassword;
