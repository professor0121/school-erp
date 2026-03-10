import mongoose, { Schema, Model } from "mongoose";
import { IUser, UserRole } from "@/src/types/user";

export interface IUserDocument extends IUser {}

const UserSchema = new Schema<IUserDocument>(
{
  name: {
    type: String,
    required: true,
  },

  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: [
      "ADMIN",
      "PRINCIPAL",
      "TEACHER",
      "ACCOUNTANT",
      "LIBRARIAN",
      "STUDENT",
      "PARENT",
      "STAFF",
    ],
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  }

},
{ timestamps: true }
);

const User: Model<IUserDocument> =
mongoose.models.User || mongoose.model("User", UserSchema);

export default User;