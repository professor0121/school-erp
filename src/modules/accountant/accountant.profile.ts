import mongoose, { Schema } from "mongoose";
interface IAccountantProfile {
  userId: mongoose.Types.ObjectId;
  department: string;
  salary: number;
}

const AccountantProfileSchema = new Schema<IAccountantProfile>({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  department:String,

  salary:Number

},{timestamps:true})

export default mongoose.models.AccountantProfile ||
mongoose.model("AccountantProfile",AccountantProfileSchema)