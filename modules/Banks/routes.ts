import { Router } from "express";

import auth_id from "../Banks/handler/Auth_id";

import userToUser from "./controller/UserToUser";
import getBankDetails from "./controller/getBankDetails";
import LinkBankAccount from "./controller/linkBankAccount";
import transferToUserWallet from "./controller/transferToUserWallet";
import walletToBank from "./controller/walletToBank";
import TransactionHistory from "./controller/transactionHistory";

const BankRouter = Router();

BankRouter.use(auth_id);

BankRouter.post("/linkBank", LinkBankAccount);
BankRouter.get("/bankDetails", getBankDetails);
BankRouter.get("/transactionHistory", TransactionHistory);

BankRouter.post("/bankToWallet", transferToUserWallet);
BankRouter.post("/walletToBank/:bank_id", walletToBank);
BankRouter.post("/userToUser", userToUser);
export default BankRouter;
