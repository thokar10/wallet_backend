import { Router } from "express";

import auth_id from "./handler/Auth_id";

import LinkBankAccount from "./controller/linkBankAccount";

const BankRouter = Router();

BankRouter.use(auth_id);

BankRouter.post("/linkBank", LinkBankAccount);

export default BankRouter;
