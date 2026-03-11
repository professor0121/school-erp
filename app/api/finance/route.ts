import { NextRequest, NextResponse } from "next/server";
import { financeService } from "@/src/modules/finance/finance.service";
import { verifyToken } from "@/src/utils/jwtToken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    // Admins viewing structures or parents/students viewing their own invoices
    const decoded = verifyToken(token);
    const action = req.nextUrl.searchParams.get("action");

    if (action === "structures") {
        const yearId = req.nextUrl.searchParams.get("academicYearId");
        if (!yearId) return NextResponse.json({ message: "academicYearId required" }, { status: 400 });
        const structures = await financeService.getFeeStructuresByYear(yearId);
        return NextResponse.json({ success: true, data: structures });
    }

    if (action === "myInvoices") {
        // Parents view their kid's invoices, Students view their own
        // In real app, check if parenId links to student. For brevity, assuming decoded.userId is student or parent has ID
        const targetId = req.nextUrl.searchParams.get("studentId") || decoded.userId; 
        const invoices = await financeService.getStudentInvoices(targetId);
        return NextResponse.json({ success: true, data: invoices });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;
    
    // NOTE: Protect with RBAC in production (only ACCOUNTANT / ADMIN)
    
    if (action === "createStructure") {
      const result = await financeService.createFeeStructure(payload);
      return NextResponse.json({ success: true, data: result }, { status: 201 });
    }
    
    if (action === "generateInvoices") {
      // payload: { studentIds: [], feeStructureId: '' }
      const res = await financeService.generateInvoices(payload.studentIds, payload.feeStructureId);
      return NextResponse.json({ success: true, data: res }, { status: 201 });
    }

    if (action === "processPayment") {
      // payment gateway mock hit
      const { invoiceId, amountToPay, paymentMethod, transactionId } = payload;
      const res = await financeService.processPayment(invoiceId, amountToPay, paymentMethod, transactionId);
      return NextResponse.json({ success: true, data: res }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
