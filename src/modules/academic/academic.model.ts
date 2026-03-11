import mongoose, { Schema } from "mongoose";

// Academic Year Schema
export interface IAcademicYear {
  name: string; // e.g. "2026-2027"
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

const AcademicYearSchema = new Schema<IAcademicYear>({
  name: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: false }
}, { timestamps: true });

export const AcademicYear = mongoose.models.AcademicYear || mongoose.model("AcademicYear", AcademicYearSchema);

// Subject Schema
export interface ISubject {
  name: string;
  code: string;
  type: "CORE" | "ELECTIVE";
}

const SubjectSchema = new Schema<ISubject>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["CORE", "ELECTIVE"], default: "CORE" }
}, { timestamps: true });

export const Subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);

// Class Schema (e.g., Grade 10)
export interface IClass {
  name: string; // e.g. "10"
  level: number; // 10
}

const ClassSchema = new Schema<IClass>({
  name: { type: String, required: true, unique: true },
  level: { type: Number, required: true }
}, {timestamps: true});

export const ClassModel = mongoose.models.Class || mongoose.model("Class", ClassSchema);

// Section Schema (e.g., 10-A)
export interface ISection {
  name: string; // e.g. "A"
  classId: mongoose.Types.ObjectId;
  classTeacherId?: mongoose.Types.ObjectId;
  subjects: mongoose.Types.ObjectId[];
  capacity: number;
}

const SectionSchema = new Schema<ISection>({
  name: { type: String, required: true },
  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  classTeacherId: { type: Schema.Types.ObjectId, ref: "User" },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  capacity: { type: Number, default: 40 }
}, { timestamps: true });

export const Section = mongoose.models.Section || mongoose.model("Section", SectionSchema);
