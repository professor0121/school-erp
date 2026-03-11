import { NextRequest, NextResponse } from "next/server";
import { payrollService } from "@/src/modules/hr/payroll.service";
import { verifyToken } from "@/src/utils/jwtToken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const decoded = verifyToken(token);
    
    const action = req.nextUrl.searchParams.get("action");
    const staffId = req.nextUrl.searchParams.get("staffId") || decoded.userId;

    if (action === "structure") {
        const structure = await payrollService.getSalaryStructure(staffId);
        return NextResponse.json({ success: true, data: structure });
    }

    if (action === "payslips") {
        const payslips = await payrollService.getPayslips(staffId);
        return NextResponse.json({ success: true, data: payslips });
    }

    return NextResponse.json({ message: "Invalid action parameter" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const decoded = verifyToken(token);
    
    // Only HR and Admin can mutate payroll
    if (!["ADMIN", "HR"].includes(decoded.role)) {
       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { action, payload } = await req.json();

    if (action === "setStructure") {
        const res = await payrollService.setSalaryStructure(payload);
        return NextResponse.json({ success: true, data: res }, { status: 201 });
    }

    if (action === "generatePayslip") {
        const { staffId, month, year, unpaidLeaves } = payload;
        const res = await payrollService.generatePayslip(staffId, month, year, unpaidLeaves);
        return NextResponse.json({ success: true, data: res }, { status: 201 });
    }

    if (action === "markPaid") {
        const res = await payrollService.markPaid(payload.payslipId);
        return NextResponse.json({ success: true, data: res }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid action payload" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
