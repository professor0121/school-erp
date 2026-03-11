import { connectDB } from "@/src/lib/mongodb";
import { AcademicYear, Subject, ClassModel, Section } from "./academic.model";

export const academicService = {
  // Academic Year
  createAcademicYear: async (data: any) => {
    await connectDB();
    const existing = await AcademicYear.findOne({ name: data.name });
    if (existing) throw new Error("Academic Year already exists");
    
    if (data.isActive) {
      await AcademicYear.updateMany({}, { isActive: false });
    }
    return AcademicYear.create(data);
  },
  getAcademicYears: async () => {
    await connectDB();
    return AcademicYear.find().sort({ startDate: -1 });
  },

  // Subjects
  createSubject: async (data: any) => {
    await connectDB();
    const existing = await Subject.findOne({ code: data.code });
    if (existing) throw new Error("Subject with this code already exists");
    return Subject.create(data);
  },
  getSubjects: async () => {
    await connectDB();
    return Subject.find().sort({ name: 1 });
  },

  // Classes
  createClass: async (data: any) => {
    await connectDB();
    const existing = await ClassModel.findOne({ name: data.name });
    if (existing) throw new Error("Class with this name already exists");
    return ClassModel.create(data);
  },
  getClasses: async () => {
    await connectDB();
    return ClassModel.find().sort({ level: 1 });
  },

  // Sections
  createSection: async (data: any) => {
    await connectDB();
    const existing = await Section.findOne({ name: data.name, classId: data.classId });
    if (existing) throw new Error("Section already exists for this class");
    return Section.create(data);
  },
  getSectionsByClass: async (classId: string) => {
    await connectDB();
    return Section.find({ classId })
      .populate("classId")
      .populate("classTeacherId", "name uniqueId")
      .populate("subjects");
  }
};
