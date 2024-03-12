import { Request, Response } from "express";
import userModel from "../../../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { uuid } from "uuidv4";

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const randomString = uuid();
  console.log(randomString);

  console.log(req.body);

  if (!email) throw "email  is required";
  if (!password) throw "password  is required";

  const findUser = await userModel
    .findOne({
      email: email,
    })
    .select("+password");

  if (!findUser) throw "user doesn't exist ";

  const checkPassword = await bcrypt.compare(password, findUser.password);

  if (!checkPassword) throw "password invalid";

  const payload = {
    user_id: findUser?._id,
  };

  const access_token = jwt.sign(payload, "Secret-Key-1076");

  res.status(200).json({
    message: "Login successful",
    access_token: access_token,
  });
};

export default userLogin;
