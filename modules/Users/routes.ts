import { Router } from "express";
import userRegister from "./controller/crud_user_register/userRegister";
import userLogin from "./controller/crud_user_login/userLogin";

import updateRegisterData from "./controller/crud_user_register/update_user_register";
import getRegisterData from "./controller/crud_user_register/read_user_register copy";
import deleteRegisterData from "./controller/crud_user_register/delete_user_register";
import userProfile from "./controller/user_profile/user_profile";
import GetSingleUser from "./controller/crud_user_register/getSIngleUser";
import auth_id from "./handler/Auth_id";
import EditUserProfile from "./controller/user_profile/Edit_user_profile ";

const userRouter = Router();

userRouter.post("/register", userRegister);
userRouter.get("/register", getRegisterData);
userRouter.patch("/register", updateRegisterData);
userRouter.delete("/register/:user_id", deleteRegisterData);
userRouter.get("/single_register_page/:user_email", GetSingleUser);
userRouter.post("/login", userLogin);

userRouter.use(auth_id);

userRouter.get("/my-profile", userProfile);
userRouter.get("/edit-my-profile", EditUserProfile);

export default userRouter;
