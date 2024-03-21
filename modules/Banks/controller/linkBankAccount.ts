import { Request, Response } from "express";
import BankModel from "../../../models/bank_model";

const LinkBankAccount = async (req: any, res: Response) => {
  const { bank_name, account_name, account_no } = req.body;

  await BankModel.create({
    user_id: req.user.user_id,
    bank_name,
    account_name,
    account_no,
    balance: 50000,
  });

  res.status(200).json({
    message: " Bank Linked Successfully",
  });
};
export default LinkBankAccount;
