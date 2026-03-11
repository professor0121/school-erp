import { NextRequest, NextResponse } from "next/server";
import { academicService } from "@/src/modules/academic/academic.service";

export async function GET() {
  try {
    const subjects = await academicService.getSubjects();
    return NextResponse.json({ success: true, data: subjects }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newSubject = await academicService.createSubject(body);
    return NextResponse.json({ success: true, data: newSubject }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
