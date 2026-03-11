import mongoose, { Schema } from "mongoose";

export interface ILeave {
  userId: mongoose.Types.ObjectId;
  type: "SICK" | "CASUAL" | "MATERNITY" | "OTHER";
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  approvedBy?: mongoose.Types.ObjectId; // User ID of Admin/Principal
  rejectionReason?: string;
  attachmentUrl?: string; // S3 or local path for medical certs, etc.
}

const LeaveSchema = new Schema<ILeave>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["SICK", "CASUAL", "MATERNITY", "OTHER"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
  approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  rejectionReason: { type: String },
  attachmentUrl: { type: String }
}, { timestamps: true });

export const Leave = mongoose.models.Leave || mongoose.model("Leave", LeaveSchema);
