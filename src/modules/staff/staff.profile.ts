import mongoose, { Schema } from "mongoose";
interface IStaffProfile {
  userId: mongoose.Types.ObjectId;
  department: string;
  designation: string;
  salary: number;
}

const StaffProfileSchema = new Schema<IStaffProfile>({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  department:String,

  designation:String,

  salary:Number

},{timestamps:true})

export default mongoose.models.StaffProfile ||
mongoose.model("StaffProfile",StaffProfileSchema)