import { NextRequest, NextResponse } from "next/server";
import { academicService } from "@/src/modules/academic/academic.service";

export async function GET(req: NextRequest) {
  try {
    const classId = req.nextUrl.searchParams.get("classId");
    if (!classId) {
       return NextResponse.json({ success: false, message: "classId query param required" }, { status: 400 });
    }
    const sections = await academicService.getSectionsByClass(classId);
    return NextResponse.json({ success: true, data: sections }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newSection = await academicService.createSection(body);
    return NextResponse.json({ success: true, data: newSection }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
