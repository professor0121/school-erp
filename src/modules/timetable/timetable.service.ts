import { connectDB } from "@/src/lib/mongodb";
import { Timetable } from "./timetable.model";

export const timetableService = {
  getTimetableBySection: async (sectionId: string, academicYearId: string) => {
    await connectDB();
    return Timetable.findOne({ sectionId, academicYearId })
      .populate("slots.subjectId", "name code")
      .populate("slots.teacherId", "name uniqueId");
  },
  
  saveTimetable: async (data: any) => {
    await connectDB();
    const { sectionId, academicYearId, slots } = data;
    
    // In a real application, we would check for Teacher overlaps here
    // i.e., ensuring a teacher isn't scheduled for two different sections at the same time.
    
    return Timetable.findOneAndUpdate(
      { sectionId, academicYearId },
      { slots },
      { new: true, upsert: true }
    );
  }
};
