import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    reset_password_token: {
      type: String,
      select: false,
    },
    phone_no: {
      type: Number,
    },
    Location: {
      type: String,
    },
    balance: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
