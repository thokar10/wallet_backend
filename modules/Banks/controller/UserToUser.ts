import { Response, Request } from "express";
import userModel from "../../../models/user.model";
import mongoose from "mongoose";
import transactionsModel from "../../../models/transaction_model";
import validator from "validator";

const userToUser = async (req: any, res: Response) => {
  const { email, user_input_balance } = req.body;

  if (user_input_balance < 50) throw "minimum balance to transfer is 50";

  const checkEmail = validator.isEmail(email.toString());

  const checkInputBalance = validator.isInt(user_input_balance.toString());

  if (!checkEmail) throw "enter email correctly";
  if (!checkInputBalance) throw "Input balance is not a  integer number";
  // if (float) throw "you can't send a money in decimal";

  const senderUserData = await userModel.findOne({
    _id: req.user.user_id,
  });

  if (!senderUserData) throw "You can't send";

  const senderBalance = senderUserData.balance;

  if (user_input_balance <= senderBalance) {
    //Deduct sender balance from DB

    const session = await mongoose.startSession();
    await session.withTransaction(async (session) => {
      const sender = await userModel.updateOne(
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

      if (!sender) throw "invalid";

      //Transaction create

      const senderEmail = senderUserData.email;

      const senderTransaction = await transactionsModel.create([
        {
          user_id: req.user.user_id,
          balance: user_input_balance,
          transaction_type: "send",
          info: `${senderEmail} sent Rs ${user_input_balance} to ${email} `,
        },
      ]);

      if (!senderTransaction) throw "invalid transaction";

      //Reciever side

      const receiver = await userModel.findOne({
        email,
      });

      if (!receiver) throw "Receiver is not valid";

      console.log(receiver);

      const receiverUpdate = await userModel.updateOne(
        {
          email,
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

      if (!receiverUpdate) throw "Invalid";

      //transaction  for receiver

      const receiverTransaction = await transactionsModel.create([
        {
          user_id: receiver._id,
          balance: user_input_balance,
          transaction_type: "receive",
          info: `${email} receive Rs ${user_input_balance} from ${senderEmail} `,
        },
      ]);
      if (!receiverTransaction) throw "invalid to create transaction";
      res.status(200).json({
        status: "user to user transfer successfully",
      });
    });
  } else {
    throw "balance insufficient";
  }
};

export default userToUser;
