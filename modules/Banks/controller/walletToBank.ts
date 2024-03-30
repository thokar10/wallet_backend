import { Request, Response } from "express";
import BankModel from "../../../models/bank_model";
import userModel from "../../../models/user.model";
import mongoose from "mongoose";
import transactionsModel from "../../../models/transaction_model";

const walletToBank = async (req: any, res: Response) => {
  const {
    user_input_balance,

    bank_name,
    account_no,
  } = req.body;

  const { bank_id } = req.params;
  console.log(bank_id);
  // to check user balance
  const userModelData = await userModel.findOne({
    _id: req.user.user_id,
  });

  if (!userModelData) throw "check user details";

  const userBalance = userModelData.balance;

  if (!userBalance) throw "check your balance";

  //transaction  process
  if (user_input_balance <= userBalance) {
    //session start to roll back
    const session = await mongoose.startSession();
    await session.withTransaction(async (session: any) => {
      // Reduced the bankBalance of user

      await userModel.updateOne(
        {
          _id: req.user.user_id,
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

      //transfer balance from bank  to user

      const updateBank = await BankModel.findOneAndUpdate(
        {
          user_id: req.user.user_id,
          bank_name,
          account_no,
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
      if (!updateBank) throw "invalid";
      const bankDetails = await BankModel.findOne({
        user_id: req.user.user_id,
      });

      if (!bankDetails) throw "transaction log cannot be prepared";

      await transactionsModel.create(
        [
          {
            user_id: req.user.user_id,
            balance: user_input_balance,
            transaction_type: "withdraw",
            info: `${user_input_balance} is transferred from ${userModelData.name} to (account_no: ${bankDetails.account_no}),(account_name:${bankDetails.account_name}),(bank_name:${bankDetails.bank_name})`,
          },
        ],
        {
          session,
        }
      );

      //end

      //end

      res.status(200).json({
        status: "Transfer  successfully",
      });
    });
  } else {
    throw "balance insufficient";
  }
};

export default walletToBank;
