import { connectDB } from "@/src/lib/mongodb";
import { Attendance } from "./attendance.model";

export const attendanceService = {
  getAttendance: async (date: string, sectionId?: string, type: string = "STUDENT") => {
    await connectDB();
    
    // Convert string 'YYYY-MM-DD' to Date range for query
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const query: any = {
      date: { $gte: startOfDay, $lte: endOfDay },
      type
    };

    if (sectionId) {
      query.sectionId = sectionId;
    }

    return Attendance.findOne(query).populate("records.userId", "name uniqueId rollNumber");
  },

  markAttendance: async (data: any) => {
    await connectDB();
    const { date, sectionId, academicYearId, type, records } = data;

    const targetDate = new Date(date).setHours(0, 0, 0, 0); // normalize the saved time to Midnight UTC

    return Attendance.findOneAndUpdate(
      { date: targetDate, sectionId, type },
      { academicYearId, records },
      { new: true, upsert: true }
    );
  }
};
