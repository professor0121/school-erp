import mongoose, { Schema } from "mongoose";

// Base Salary
export interface ISalaryStructure {
  staffId: mongoose.Types.ObjectId;
  basicSalary: number;
  allowances: number;
  deductions: number;
}
const SalaryStructureSchema = new Schema<ISalaryStructure>({
  staffId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 }
}, { timestamps: true });


// Monthly Payslip Log
export interface IPayslip {
  staffId: mongoose.Types.ObjectId;
  month: number; // 1-12
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  unpaidLeaveDeduction: number;
  netSalary: number;
  status: "PENDING" | "PAID";
  paymentDate?: Date;
}
const PayslipSchema = new Schema<IPayslip>({
  staffId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: Number, required: true, min: 1, max: 12 },
  year: { type: Number, required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, required: true },
  deductions: { type: Number, required: true },
  unpaidLeaveDeduction: { type: Number, default: 0 },
  netSalary: { type: Number, required: true },
  status: { type: String, enum: ["PENDING", "PAID"], default: "PENDING" },
  paymentDate: { type: Date }
}, { timestamps: true });
PayslipSchema.index({ staffId: 1, month: 1, year: 1 }, { unique: true });

export const SalaryStructure = mongoose.models.SalaryStructure || mongoose.model("SalaryStructure", SalaryStructureSchema);
export const Payslip = mongoose.models.Payslip || mongoose.model("Payslip", PayslipSchema);
