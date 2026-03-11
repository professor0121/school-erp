import { NextRequest, NextResponse } from "next/server";
import { academicService } from "@/src/modules/academic/academic.service";

export async function GET() {
  try {
    const years = await academicService.getAcademicYears();
    return NextResponse.json({ success: true, data: years }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newYear = await academicService.createAcademicYear(body);
    return NextResponse.json({ success: true, data: newYear }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
