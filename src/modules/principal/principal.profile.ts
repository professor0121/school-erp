import mongoose, { Schema } from "mongoose";

interface IPrincipalProfile {
  userId: mongoose.Types.ObjectId;
  officeNumber: string;
  joiningDate: Date;
}

const PrincipalProfileSchema = new Schema<IPrincipalProfile>({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  officeNumber:String,

  joiningDate:Date

},{timestamps:true})

export default mongoose.models.PrincipalProfile ||
mongoose.model("PrincipalProfile",PrincipalProfileSchema)