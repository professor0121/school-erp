import { NextRequest, NextResponse } from "next/server";
import { examinationService } from "@/src/modules/examination/examination.service";

export async function GET(req: NextRequest) {
  try {
    const action = req.nextUrl.searchParams.get("action");

    if (action === "getExams") {
      const academicYearId = req.nextUrl.searchParams.get("academicYearId");
      if (!academicYearId) return NextResponse.json({ message: "academicYearId required" }, { status: 400 });
      const exams = await examinationService.getExams(academicYearId);
      return NextResponse.json({ success: true, data: exams });
    }

    if (action === "getSchedules") {
      const examId = req.nextUrl.searchParams.get("examId");
      const sectionId = req.nextUrl.searchParams.get("sectionId");
      if (!examId || !sectionId) return NextResponse.json({ message: "examId and sectionId required" }, { status: 400 });
      const schedules = await examinationService.getExamSchedules(examId, sectionId);
      return NextResponse.json({ success: true, data: schedules });
    }

    if (action === "getStudentResults") {
      const examId = req.nextUrl.searchParams.get("examId");
      const studentId = req.nextUrl.searchParams.get("studentId");
      if (!examId || !studentId) return NextResponse.json({ message: "examId and studentId required" }, { status: 400 });
      const results = await examinationService.getStudentResults(examId, studentId);
      return NextResponse.json({ success: true, data: results });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, payload } = body;
        
        if (action === "createExam") {
            const result = await examinationService.createExam(payload);
            return NextResponse.json({ success: true, data: result }, { status: 201 });
        }
        
        if (action === "createSchedule") {
            const result = await examinationService.createExamSchedule(payload);
            return NextResponse.json({ success: true, data: result }, { status: 201 });
        }
        
        if (action === "postResults") {
            const { examScheduleId, results } = payload;
            const res = await examinationService.postExamResults(examScheduleId, results);
            return NextResponse.json({ success: true, data: res }, { status: 201 });
        }

        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
