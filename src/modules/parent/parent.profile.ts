import mongoose, { Schema } from "mongoose";

interface IParentProfile {
  userId: mongoose.Types.ObjectId;
  children: mongoose.Types.ObjectId[];
  phone: string;
  address: string;
}

const ParentProfileSchema = new Schema<IParentProfile>({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  children:[
    {
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  ],

  phone:String,

  address:String

},{timestamps:true})

export default mongoose.models.ParentProfile ||
mongoose.model("ParentProfile",ParentProfileSchema)