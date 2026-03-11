import { connectDB } from "@/src/lib/mongodb";
import { Exam, ExamSchedule, ExamResult } from "./examination.model";

export const examinationService = {
  createExam: async (data: any) => {
    await connectDB();
    return Exam.create(data);
  },
  getExams: async (academicYearId: string) => {
    await connectDB();
    return Exam.find({ academicYearId }).sort({ startDate: -1 });
  },

  createExamSchedule: async (data: any) => {
    await connectDB();
    // Validate bounds
    const exam = await Exam.findById(data.examId);
    if (!exam) throw new Error("Exam not found");
    const targetDate = new Date(data.date);
    if (targetDate < exam.startDate || targetDate > exam.endDate) {
      throw new Error("Schedule date must fall within the Exam's date range");
    }
    return ExamSchedule.create(data);
  },
  getExamSchedules: async (examId: string, sectionId: string) => {
    await connectDB();
    return ExamSchedule.find({ examId, sectionId })
      .populate("subjectId", "name code type");
  },

  postExamResults: async (examScheduleId: string, resultsArray: any[]) => {
    await connectDB();
    const schedule = await ExamSchedule.findById(examScheduleId);
    if (!schedule) throw new Error("Exam schedule not found");

    const processedResults = resultsArray.map(r => ({
      examScheduleId,
      studentId: r.studentId,
      marksObtained: r.marksObtained,
      grade: r.grade,
      remarks: r.remarks,
      isPassed: r.marksObtained >= schedule.passingMarks
    }));

    // Perform bulk up-sert to handle updates gracefully
    const bulkOps = processedResults.map(res => ({
      updateOne: {
        filter: { examScheduleId: res.examScheduleId, studentId: res.studentId },
        update: { $set: res },
        upsert: true
      }
    }));

    return ExamResult.bulkWrite(bulkOps);
  },
  
  getStudentResults: async (examId: string, studentId: string) => {
    await connectDB();
    // Complex query: Find all schedules for this exam, then all results for this student
    const schedules = await ExamSchedule.find({ examId }).select("_id subjectId totalMarks passingMarks date");
    const scheduleIds = schedules.map(s => s._id);
    
    const results = await ExamResult.find({ 
      examScheduleId: { $in: scheduleIds }, 
      studentId 
    }).populate({
      path: "examScheduleId",
      populate: { path: "subjectId", select: "name code" }
    });

    return results;
  }
};
