import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser, UserRole } from "@/src/types/user";

export interface IUserDocument extends IUser {}

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: [
        "ADMIN",
        "PRINCIPAL",
        "TEACHER",
        "ACCOUNTANT",
        "LIBRARIAN",
        "FEE_COLLECTOR",
        "STUDENT",
        "PARENT",
        "STAFF",
      ] as UserRole[],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
export default User;