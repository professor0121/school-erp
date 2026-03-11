import { NextRequest, NextResponse } from "next/server";
import { academicService } from "@/src/modules/academic/academic.service";

export async function GET() {
  try {
    const classes = await academicService.getClasses();
    return NextResponse.json({ success: true, data: classes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newClass = await academicService.createClass(body);
    return NextResponse.json({ success: true, data: newClass }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
