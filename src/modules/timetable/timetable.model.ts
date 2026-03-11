import mongoose, { Schema } from "mongoose";

export interface ITimetableSlot {
  subjectId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
  startTime: string; // "09:00"
  endTime: string; // "10:00"
}

export interface ITimetable {
  sectionId: mongoose.Types.ObjectId;
  academicYearId: mongoose.Types.ObjectId;
  slots: ITimetableSlot[];
}

const TimetableSlotSchema = new Schema<ITimetableSlot>({
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dayOfWeek: { type: String, enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"], required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
}, { _id: false });

const TimetableSchema = new Schema<ITimetable>({
  sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
  academicYearId: { type: Schema.Types.ObjectId, ref: "AcademicYear", required: true },
  slots: [TimetableSlotSchema]
}, { timestamps: true });

TimetableSchema.index({ sectionId: 1, academicYearId: 1 }, { unique: true });

export const Timetable = mongoose.models.Timetable || mongoose.model("Timetable", TimetableSchema);
