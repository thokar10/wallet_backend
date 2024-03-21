import { Request, Response } from "express";
import BankModel from "../../../models/bank_model";
import transactionsModel from "../../../models/transaction_model";

const getTransactionDetails = async (req: any, res: Response) => {
  const userData = await transactionsModel.find({
    user_id: req.user.user_id,
  });

  res.status(200).json({
    message: "Transaction history",
    status: "success",
    Transaction_details: userData,
  });
};
export default getTransactionDetails;
