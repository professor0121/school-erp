import mongoose, { Schema } from "mongoose";

export interface IAnnouncement {
  title: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  targetRoles: string[]; // e.g. ["TEACHER", "STUDENT", "PARENT", "ALL"]
  targetSectionId?: mongoose.Types.ObjectId; // Optional: restrict to a specific class section
  isUrgent: boolean;
  expiresAt?: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  targetRoles: [{ type: String, required: true }],
  targetSectionId: { type: Schema.Types.ObjectId, ref: "Section" },
  isUrgent: { type: Boolean, default: false },
  expiresAt: { type: Date }
}, { timestamps: true });

export const Announcement = mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
