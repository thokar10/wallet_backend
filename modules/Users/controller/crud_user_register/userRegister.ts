import { Request, Response, json } from "express";
import userModel from "../../../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userRegister = async (req: Request, res: Response) => {
  const { email, password, name, confirm_password } = req.body;
  console.log(req.body);
  const encryptedPassword = await bcrypt.hash(password, 8);
  console.log(encryptedPassword);

  const findEmail = await userModel.findOne({
    email,
  });

  const checkEmail = validator.isEmail(email.toString());
  if (!checkEmail) throw "invalid email format";
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

  const existedEmail = await userModel.findOne({
    email,
  });
  const payload = {
    user_id: existedEmail!._id,
  };

  const access_token = jwt.sign(payload, process.env!.secret_key!, {
    expiresIn: "90days",
  });
  const objectAccess_token = { access_token };
  const mergedData = { ...userCreate.toObject(), ...objectAccess_token };

  console.log(objectAccess_token);
  console.log(access_token);
  res.status(200).json({
    message: "registered successfully",
    status: "success",
    data: mergedData,
  });
};

export default userRegister;
