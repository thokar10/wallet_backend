import { Request, Response } from "express";
import BankModel from "../../../models/bank_model";
import userModel from "../../../models/user.model";
import mongoose, { mongo } from "mongoose";
import transactionsModel from "../../../models/transaction_model";

const transferToUserWallet = async (req: any, res: Response) => {
  const { user_input_balance, transaction_type } = req.body;

  const userBankData = await BankModel.findOne({
    user_id: req.user.user_id,
  });

  if (!userBankData) throw "user invalid";

  const userBankBalance = userBankData.balance;

  if (!userBankBalance) throw "check your balance";

  //transaction  process
  if (user_input_balance <= userBankBalance) {
    //session start to roll back
    const session = await mongoose.startSession();
    await session.withTransaction(async (session) => {
      // Reduced the bankBalance

      const subtractedBankBalance = await BankModel.updateOne(
        {
          user_id: req.user.user_id,
        },
        {
          $inc: {
            balance: user_input_balance * -1,
          },
        },
        {
          session,
        }
      );
      if (!subtractedBankBalance) throw "bank balance cant be updated";

      await transactionsModel.create([
        {
          user_id: req.user.user_id,
          balance: user_input_balance,
          transaction_type,
          info: `${user_input_balance} is loaded from ${userBankData.bank_name} (account_no: ${userBankData.account_no}),(account_name:${userBankData.account_name})`,
        },
      ]);

      //transfer balance from bank  to user

      const userDetails = await userModel.updateOne(
        {
          _id: req.user.user_id,
        },
        {
          $inc: {
            balance: user_input_balance,
          },
        },
        {
          session,
        }
      );

      if (!userDetails) throw "balance transfer failed";

      //end

      res.status(200).json({
        status: "Transfer  successfully",
      });
    });
  } else {
    throw "balance insufficient";
  }
};

export default transferToUserWallet;
