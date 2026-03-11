import { NextRequest, NextResponse } from "next/server";
import { attendanceService } from "@/src/modules/attendance/attendance.service";

export async function GET(req: NextRequest) {
  try {
    const sectionId = req.nextUrl.searchParams.get("sectionId");
    const date = req.nextUrl.searchParams.get("date"); // YYYY-MM-DD
    const type = req.nextUrl.searchParams.get("type") || "STUDENT";

    if (!date) {
      return NextResponse.json({ success: false, message: "Date parameter is required" }, { status: 400 });
    }

    if (type === "STUDENT" && !sectionId) {
      return NextResponse.json({ success: false, message: "sectionId is required for student attendance" }, { status: 400 });
    }

    const attendance = await attendanceService.getAttendance(date, sectionId || undefined, type);
    return NextResponse.json({ success: true, data: attendance }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const attendance = await attendanceService.markAttendance(body);
    return NextResponse.json({ success: true, data: attendance }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
