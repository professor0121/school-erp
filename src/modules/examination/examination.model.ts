import mongoose, { Schema } from "mongoose";

// Exam Definition (e.g. Midterms 2026)
export interface IExam {
  name: string; // "Mid Term Examination"
  academicYearId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
}
const ExamSchema = new Schema<IExam>({
  name: { type: String, required: true },
  academicYearId: { type: Schema.Types.ObjectId, ref: "AcademicYear", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
}, { timestamps: true });

// Exam Timetable for a specific section
export interface IExamSchedule {
  examId: mongoose.Types.ObjectId;
  sectionId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  date: Date;
  startTime: string; // "09:00"
  endTime: string;   // "12:00"
  passingMarks: number;
  totalMarks: number;
}
const ExamScheduleSchema = new Schema<IExamSchedule>({
  examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
  sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  passingMarks: { type: Number, default: 40 },
  totalMarks: { type: Number, default: 100 }
}, { timestamps: true });
ExamScheduleSchema.index({ examId: 1, sectionId: 1, subjectId: 1 }, { unique: true });

// Individual student result for an exam schedule
export interface IExamResult {
  examScheduleId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  marksObtained: number;
  grade?: string;
  remarks?: string;
  isPassed: boolean;
}
const ExamResultSchema = new Schema<IExamResult>({
  examScheduleId: { type: Schema.Types.ObjectId, ref: "ExamSchedule", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  marksObtained: { type: Number, required: true },
  grade: { type: String },
  remarks: { type: String },
  isPassed: { type: Boolean, required: true }
}, { timestamps: true });
ExamResultSchema.index({ examScheduleId: 1, studentId: 1 }, { unique: true });

export const Exam = mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
export const ExamSchedule = mongoose.models.ExamSchedule || mongoose.model("ExamSchedule", ExamScheduleSchema);
export const ExamResult = mongoose.models.ExamResult || mongoose.model("ExamResult", ExamResultSchema);
