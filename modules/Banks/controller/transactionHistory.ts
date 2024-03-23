import { Request, Response } from "express";
import transactionsModel from "../../../models/transaction_model";

const TransactionHistory = async (req: any, res: Response) => {
  const { type } = req.body;

  let TransactionDetails;

  if (type) {
    console.log(type);
    TransactionDetails = await transactionsModel
      .find({
        user_id: req.user.user_id,
        transaction_type: type,
      })
      .sort("-createdAt");

    if (!TransactionDetails) throw "unable to find Transaction history";
  } else {
    TransactionDetails = await transactionsModel
      .find({
        user_id: req.user.user_id,
      })
      .sort("-createdAt");
    if (!TransactionDetails) throw "unable to find Transaction history";
  }

  res.status(200).json({
    message: "success",
    transactionHistory: TransactionDetails,
    // Transaction_history: TransactionDetails,
  });
};
export default TransactionHistory;
