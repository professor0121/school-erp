import mongoose, { Schema } from "mongoose";
interface IFeeCollectorProfile {
  userId: mongoose.Types.ObjectId;
  counterNumber: string;
}

const FeeCollectorProfileSchema = new Schema<IFeeCollectorProfile>({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  counterNumber:String

},{timestamps:true})

export default mongoose.models.FeeCollectorProfile ||
mongoose.model("FeeCollectorProfile",FeeCollectorProfileSchema)