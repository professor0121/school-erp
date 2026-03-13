import mongoose, { Schema, Model } from "mongoose";

interface IHRProfile {
  userId: mongoose.Types.ObjectId;
  permissions: string[];
}

const HRProfileSchema = new Schema<IHRProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    permissions: [
      {
        type: String
      }
    ]

  }, { timestamps: true })

const HRProfile: Model<IHRProfile> =
  mongoose.models.HRProfile ||
  mongoose.model("HRProfile", HRProfileSchema)

export default HRProfile