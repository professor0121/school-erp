import { NextRequest, NextResponse } from "next/server";
import { leaveService } from "@/src/modules/leave/leave.service";
import { verifyToken } from "@/src/utils/jwtToken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    
    // If admin or principal, they might want to see all pending
    const filter = req.nextUrl.searchParams.get("filter");
    
    if (filter === "pending" && ["ADMIN", "PRINCIPAL", "HR"].includes(decoded.role)) {
      const leaves = await leaveService.getAllPendingLeaves();
      return NextResponse.json({ success: true, data: leaves }, { status: 200 });
    }

    // Default: Return user's own leaves
    const leaves = await leaveService.getLeavesByUser(decoded.userId);
    return NextResponse.json({ success: true, data: leaves }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const decoded = verifyToken(token);
    const body = await req.json();
    
    const leave = await leaveService.applyForLeave({
      ...body,
      userId: decoded.userId
    });

    return NextResponse.json({ success: true, data: leave }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const decoded = verifyToken(token);
    
    // Only Admin/Principal/HR can approve leaves
    if (!["ADMIN", "PRINCIPAL", "HR"].includes(decoded.role)) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { leaveId, status, rejectionReason } = await req.json();
    
    if (!leaveId || !status) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const updatedLeave = await leaveService.updateLeaveStatus(leaveId, status, decoded.userId, rejectionReason);

    return NextResponse.json({ success: true, data: updatedLeave }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
