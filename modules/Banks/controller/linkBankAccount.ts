import { Request, Response } from "express";
import BankModel from "../../../models/bank_model";
import validator from "validator";

const LinkBankAccount = async (req: any, res: Response) => {
  const { bank_name, account_name, account_no } = req.body;

  if (!bank_name) throw "bank name is required";
  if (!account_name) throw "Account name is required";
  if (!account_no) throw "Account number  is required";

  const checkAccountNumberFormat = validator.isInt(account_no.toString());
  if (!checkAccountNumberFormat) throw "account number must be numeric";

  const findExistedAccount = await BankModel.findOne({
    account_no,
    bank_name,
  });

  if (findExistedAccount) throw "this account is already existed";

  await BankModel.create({
    user_id: req.user.user_id,
    bank_name,
    account_name,
    account_no,
    balance: 5000,
  });

  res.status(200).json({
    message: " Bank Linked Successfully",
  });
};
export default LinkBankAccount;
