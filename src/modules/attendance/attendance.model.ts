import mongoose, { Schema } from "mongoose";

export interface IAttendanceRecord {
  userId: mongoose.Types.ObjectId;  // The Student or Staff ID
  status: "PRESENT" | "ABSENT" | "LATE" | "HALF_DAY";
  remarks?: string;
}

export interface IAttendance {
  date: Date;
  academicYearId: mongoose.Types.ObjectId;
  sectionId?: mongoose.Types.ObjectId; // If null, it could be staff attendance or school-wide
  type: "STUDENT" | "STAFF";
  records: IAttendanceRecord[];
}

const AttendanceRecordSchema = new Schema<IAttendanceRecord>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["PRESENT", "ABSENT", "LATE", "HALF_DAY"], required: true },
  remarks: String
}, { _id: false });

const AttendanceSchema = new Schema<IAttendance>({
  date: { type: Date, required: true },
  academicYearId: { type: Schema.Types.ObjectId, ref: "AcademicYear", required: true },
  sectionId: { type: Schema.Types.ObjectId, ref: "Section" },
  type: { type: String, enum: ["STUDENT", "STAFF"], required: true },
  records: [AttendanceRecordSchema]
}, { timestamps: true });

// Ensure we don't have multiple attendance sheets for the same class on the same day
AttendanceSchema.index({ date: 1, sectionId: 1, type: 1 }, { unique: true });

export const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
