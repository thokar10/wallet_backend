import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    account_name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    account_no: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BankModel = mongoose.model("banks", bankSchema);
export default BankModel;
