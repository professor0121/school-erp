import { NextRequest, NextResponse } from "next/server";
import { communicationService } from "@/src/modules/communication/communication.service";
import { verifyToken } from "@/src/utils/jwtToken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const decoded = verifyToken(token);
    let appointments;

    if (decoded.role === "PARENT") {
      appointments = await communicationService.getAppointmentsForParent(decoded.userId);
    } else if (decoded.role === "TEACHER") {
      appointments = await communicationService.getAppointmentsForTeacher(decoded.userId);
    } else if (["ADMIN", "PRINCIPAL"].includes(decoded.role)) {
       // Admins can query specifically if they pass a teacherId
       const teacherId = req.nextUrl.searchParams.get("teacherId");
       if (teacherId) {
          appointments = await communicationService.getAppointmentsForTeacher(teacherId);
       } else {
          return NextResponse.json({ message: "teacherId requried for administrators" }, { status: 400 });
       }
    } else {
        return NextResponse.json({ message: "Forbidden role for accessing PT hub" }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: appointments }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const decoded = verifyToken(token);
    
    // Typically parents request, but occasionally teachers might request meetings
    const body = await req.json();
    const appointmentPayload = {
      ...body,
      // override parent/teacher ID based on who is initiating to prevent spoofing
      ...(decoded.role === "PARENT" ? { parentId: decoded.userId } : {}),
      ...(decoded.role === "TEACHER" ? { teacherId: decoded.userId } : {})
    }

    const newAppointment = await communicationService.requestAppointment(appointmentPayload);
    return NextResponse.json({ success: true, data: newAppointment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const body = await req.json();
    const { appointmentId, status, teacherFeedback } = body;
    
    if (!appointmentId) return NextResponse.json({ message: "appointmentId required" }, { status: 400 });

    const updated = await communicationService.updateAppointmentStatus(appointmentId, { status, teacherFeedback });
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
