import mongoose, { Schema } from "mongoose";

// Structure dictating how much a specific Grade/Class owes per frequency
export interface IFeeStructure {
  academicYearId: mongoose.Types.ObjectId;
  classLevel: number; // e.g. 10 for Grade 10
  feeType: string; // e.g. "TUITION", "TRANSPORT", "LIBRARY"
  amount: number;
  frequency: "MONTHLY" | "QUARTERLY" | "YEARLY";
  dueDateOffsetDays: number; // e.g., due 5 days after generation
}

const FeeStructureSchema = new Schema<IFeeStructure>({
  academicYearId: { type: Schema.Types.ObjectId, ref: "AcademicYear", required: true },
  classLevel: { type: Number, required: true },
  feeType: { type: String, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, enum: ["MONTHLY", "QUARTERLY", "YEARLY"], required: true },
  dueDateOffsetDays: { type: Number, default: 5 }
}, { timestamps: true });


// Actual bill generated for a student
export interface IInvoice {
  studentId: mongoose.Types.ObjectId;
  feeStructureId: mongoose.Types.ObjectId;
  amountDue: number;
  amountPaid: number;
  status: "UNPAID" | "PARTIAL" | "PAID";
  dueDate: Date;
  paidDate?: Date;
  paymentMethod?: string; // "CASH", "CARD", "ONLINE"
  transactionId?: string; // e.g. Stripe Charge ID
}

const InvoiceSchema = new Schema<IInvoice>({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  feeStructureId: { type: Schema.Types.ObjectId, ref: "FeeStructure", required: true },
  amountDue: { type: Number, required: true },
  amountPaid: { type: Number, default: 0 },
  status: { type: String, enum: ["UNPAID", "PARTIAL", "PAID"], default: "UNPAID" },
  dueDate: { type: Date, required: true },
  paidDate: { type: Date },
  paymentMethod: { type: String },
  transactionId: { type: String }
}, { timestamps: true });

export const FeeStructure = mongoose.models.FeeStructure || mongoose.model("FeeStructure", FeeStructureSchema);
export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
