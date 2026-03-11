import { NextRequest, NextResponse } from "next/server";
import { timetableService } from "@/src/modules/timetable/timetable.service";

export async function GET(req: NextRequest) {
  try {
    const sectionId = req.nextUrl.searchParams.get("sectionId");
    const academicYearId = req.nextUrl.searchParams.get("academicYearId");

    if (!sectionId || !academicYearId) {
      return NextResponse.json({ success: false, message: "sectionId and academicYearId are required" }, { status: 400 });
    }

    const timetable = await timetableService.getTimetableBySection(sectionId, academicYearId);
    return NextResponse.json({ success: true, data: timetable }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const timetable = await timetableService.saveTimetable(body);
    return NextResponse.json({ success: true, data: timetable }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
