import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    bank_name: {
      type: String,
      require: true,
    },
    account_name: {
      type: String,
      require: true,
    },
    balance: {
      type: Number,
      require: true,
    },
    account_no: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const BankModel = mongoose.model("banks", bankSchema);
export default BankModel;
