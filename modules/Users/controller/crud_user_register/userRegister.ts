import { Request, Response, json } from "express";
import userModel from "../../../../models/user.model";
import bcrypt from "bcrypt";

const userRegister = async (req: Request, res: Response) => {
  const { email, password, name, confirm_password } = req.body;
  console.log(req.body);
  const encryptedPassword = await bcrypt.hash(password, 8);
  console.log(encryptedPassword);

  const findEmail = await userModel.findOne({
    email,
  });

  if (findEmail) throw "email already existed ";
  if (!email) throw "email  is required ";
  if (!password) throw "password  is required ";
  if (!name) throw "name  is required ";
  if (name.length < 3) throw "name should  greater than 3";
  if (!confirm_password) throw "confirm password  is required ";

  if (password != confirm_password) throw "password doesn't matched";

  const userCreate = await userModel.create({
    name: name,
    email: email,
    password: encryptedPassword,
  });

  res.status(200).json({
    message: "registered successfully",
    status: "success",
    data: userCreate,
  });
};

export default userRegister;
