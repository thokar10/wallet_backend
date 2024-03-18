import { Request, Response } from "express";
import userModel from "../../../../models/user.model";
import bcrypt from "bcrypt";

const resetPasswordPage = async (req: Request, res: Response) => {
  const { otp, new_password, confirm_password } = req.body;
  console.log(req.query.email);
  const email = req.query.email;
  console.log(req.body);

  if (!email) throw "email  is required";
  if (!otp) throw "otp  is required";
  if (!new_password) throw "new password   is required";
  if (!confirm_password) throw "confirm password   is required";

  if (new_password != confirm_password) throw "password doesn't match";

  const hashPassword = await bcrypt.hash(new_password, 8);

  const userData = await userModel
    .findOne({
      email,
    })
    .select("+reset_password_token");

  console.log("otp " + userData?.reset_password_token);

  if (userData?.reset_password_token != otp) throw "otp verification failed";
  const update = await userModel.updateOne(
    {
      email,
    },
    {
      password: hashPassword,
      reset_password_token: " ",
    }
  );

  if (!update) throw "unable to change password";

  res.status(200).json({
    message: "password changed successfully",
  });
};

export default resetPasswordPage;
