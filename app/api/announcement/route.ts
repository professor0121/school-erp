import { NextRequest, NextResponse } from "next/server";
import { announcementService } from "@/src/modules/announcement/announcement.service";
import { verifyToken } from "@/src/utils/jwtToken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const decoded = verifyToken(token);
    const sectionId = req.nextUrl.searchParams.get("sectionId");
    
    // Pass role and optionally sectionId to fetch relevant announcements
    const notices = await announcementService.getAnnouncements(decoded.role, sectionId || undefined);
    
    return NextResponse.json({ success: true, data: notices }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const decoded = verifyToken(token);
    
    // Typically, only Admins, Principals, or Teachers (for their class) can post announcements
    if (["STUDENT", "PARENT"].includes(decoded.role)) {
       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const announcement = await announcementService.createAnnouncement({
        ...body,
        authorId: decoded.userId
    });

    return NextResponse.json({ success: true, data: announcement }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
