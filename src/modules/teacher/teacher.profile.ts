import mongoose, { Schema } from "mongoose";
interface ITeacherProfile {
  userId: mongoose.Types.ObjectId;
  subjects: string[];
  qualification: string;
  experience: number;
}

const TeacherProfileSchema = new Schema<ITeacherProfile>({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  subjects:[String],

  qualification:String,

  experience:Number

},{timestamps:true})

export default mongoose.models.TeacherProfile ||
mongoose.model("TeacherProfile",TeacherProfileSchema)