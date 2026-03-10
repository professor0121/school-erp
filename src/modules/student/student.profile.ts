import mongoose, { Schema, Model } from "mongoose";

interface IStudentProfile {
  userId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  section: string;
  rollNumber: number;
  parentId: mongoose.Types.ObjectId;
}

const StudentProfileSchema = new Schema<IStudentProfile>({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  classId:{
    type:Schema.Types.ObjectId,
    ref:"Class"
  },

  section:String,

  rollNumber:Number,

  parentId:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }

},{timestamps:true})

export default mongoose.models.StudentProfile ||
mongoose.model("StudentProfile",StudentProfileSchema)