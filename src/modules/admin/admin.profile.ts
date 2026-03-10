import mongoose, { Schema, Model } from "mongoose";

interface IAdminProfile {
  userId: mongoose.Types.ObjectId;
  permissions: string[];
}

const AdminProfileSchema = new Schema<IAdminProfile>(
{
  userId:{
    type: Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  permissions:[
    {
      type:String
    }
  ]

},{timestamps:true})

const AdminProfile:Model<IAdminProfile> =
mongoose.models.AdminProfile ||
mongoose.model("AdminProfile",AdminProfileSchema)

export default AdminProfile