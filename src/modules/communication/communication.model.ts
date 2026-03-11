import mongoose, { Schema } from "mongoose";

export interface IAppointment {
  parentId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  scheduledDate: Date;
  status: "REQUESTED" | "SCHEDULED" | "COMPLETED" | "CANCELLED";
  parentRemarks?: string;
  teacherFeedback?: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  parentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ["REQUESTED", "SCHEDULED", "COMPLETED", "CANCELLED"], default: "REQUESTED" },
  parentRemarks: { type: String },
  teacherFeedback: { type: String }
}, { timestamps: true });

export const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
