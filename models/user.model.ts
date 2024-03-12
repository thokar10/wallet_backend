import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

  auth_id: {
    type: String,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
