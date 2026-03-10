import mongoose, { Schema } from "mongoose";
interface ILibrarianProfile {
  userId: mongoose.Types.ObjectId;
  librarySection: string;
}

const LibrarianProfileSchema = new Schema<ILibrarianProfile>({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  librarySection:String

},{timestamps:true})

export default mongoose.models.LibrarianProfile ||
mongoose.model("LibrarianProfile",LibrarianProfileSchema)