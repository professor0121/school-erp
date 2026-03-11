import { connectDB } from "@/src/lib/mongodb";
import { SalaryStructure, Payslip } from "./payroll.model";

export const payrollService = {
  setSalaryStructure: async (data: any) => {
    await connectDB();
    const { staffId } = data;
    return SalaryStructure.findOneAndUpdate(
      { staffId },
      data,
      { new: true, upsert: true }
    );
  },

  getSalaryStructure: async (staffId: string) => {
    await connectDB();
    return SalaryStructure.findOne({ staffId }).populate("staffId", "name role");
  },

  generatePayslip: async (staffId: string, month: number, year: number, unpaidLeaves: number = 0) => {
    await connectDB();
    const structure = await SalaryStructure.findOne({ staffId });
    if (!structure) throw new Error("Salary structure not defined for this staff member");

    // Crude calculation logic: assume 30 days a month
    const perDaySalary = structure.basicSalary / 30;
    const leaveDeduction = perDaySalary * unpaidLeaves;
    
    const netSalary = (structure.basicSalary + structure.allowances) - structure.deductions - leaveDeduction;

    const payslipData = {
      staffId,
      month,
      year,
      basicSalary: structure.basicSalary,
      allowances: structure.allowances,
      deductions: structure.deductions,
      unpaidLeaveDeduction: leaveDeduction,
      netSalary,
      status: "PENDING"
    };

    return Payslip.findOneAndUpdate(
        { staffId, month, year },
        payslipData,
        { new: true, upsert: true }
    );
  },

  getPayslips: async (staffId: string) => {
    await connectDB();
    return Payslip.find({ staffId }).sort({ year: -1, month: -1 });
  },

  markPaid: async (payslipId: string) => {
    await connectDB();
    return Payslip.findByIdAndUpdate(payslipId, { status: "PAID", paymentDate: new Date() }, { new: true });
  }
};
