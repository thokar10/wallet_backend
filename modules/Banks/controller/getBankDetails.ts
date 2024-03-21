import { Request, Response } from "express";
import BankModel from "../../../models/bank_model";

const getBankDetails = async (req: any, res: Response) => {
  const userData = await BankModel.find({
    user_id: req.user.user_id,
  });

  res.status(200).json({
    message: "Bank details",
    status: "success",
    details: userData,
  });
};
export default getBankDetails;
