import { Router } from "express";

import auth_id from "../Banks/handler/Auth_id";

import LinkBankAccount from "./controller/linkBankAccount";
import getBankDetails from "./controller/getBankDetails";
import transferToUserWallet from "./controller/transferToUserWallet";
import getTransactionDetails from "./controller/getTransactionDetails";
import walletToBank from "./controller/walletToBank";

const BankRouter = Router();

BankRouter.use(auth_id);

BankRouter.post("/linkBank", LinkBankAccount);
BankRouter.get("/bankDetails", getBankDetails);
BankRouter.get("/transactionDetails", getTransactionDetails);
BankRouter.post("/bankToWallet", transferToUserWallet);
BankRouter.post("/walletToBank/:bank_id", walletToBank);

export default BankRouter;
