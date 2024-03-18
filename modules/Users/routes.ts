import { Router } from "express";
import userRegister from "./controller/crud_user_register/userRegister";
import userLogin from "./controller/user_login/userLogin";

import updateRegisterData from "./controller/crud_user_register/update_user_register";
import getRegisterData from "./controller/crud_user_register/read_user_register copy";
import deleteRegisterData from "./controller/crud_user_register/delete_user_register";
import userProfile from "./controller/user_profile/user_profile";
import GetSingleUser from "./controller/crud_user_register/getSIngleUser";
import auth_id from "./handler/Auth_id";

import resetPassword from "./controller/Password_reset/reset_password_verify";
import resetPasswordPage from "./controller/Password_reset/password_reset_page";
import EditUserProfile from "./controller/user_profile/Edit_User_Profile";

const userRouter = Router();

userRouter.post("/register", userRegister);
userRouter.get("/register", getRegisterData);
userRouter.patch("/register", updateRegisterData);
userRouter.delete("/register/:user_id", deleteRegisterData);
userRouter.get("/single_register_page/:user_email", GetSingleUser);
userRouter.post("/login", userLogin);
userRouter.post("/reset_password_verify", resetPassword);
userRouter.post("/resetPage", resetPasswordPage);

userRouter.use(auth_id);

userRouter.get("/my-profile", userProfile);
userRouter.post("/edit-my-profile", EditUserProfile);

export default userRouter;
