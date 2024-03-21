import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    bank_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    balance: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      enum: ["load", "send", "receive", "withdraw"],
    },
    info: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const transactionsModel = mongoose.model("transactions", transactionsSchema);
export default transactionsModel;
