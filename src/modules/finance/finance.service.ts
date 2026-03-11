import { connectDB } from "@/src/lib/mongodb";
import { FeeStructure, Invoice } from "./finance.model";

export const financeService = {
  createFeeStructure: async (data: any) => {
    await connectDB();
    return FeeStructure.create(data);
  },

  getFeeStructuresByYear: async (academicYearId: string) => {
    await connectDB();
    return FeeStructure.find({ academicYearId });
  },

  // Example batch generation method
  generateInvoices: async (studentIds: string[], feeStructureId: string) => {
    await connectDB();
    const structure = await FeeStructure.findById(feeStructureId);
    if (!structure) throw new Error("Fee structure not found");

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + structure.dueDateOffsetDays);

    const invoicesData = studentIds.map(studentId => ({
      studentId,
      feeStructureId,
      amountDue: structure.amount,
      amountPaid: 0,
      status: "UNPAID",
      dueDate
    }));

    // Efficiently insert multiple records
    return Invoice.insertMany(invoicesData);
  },

  getStudentInvoices: async (studentId: string) => {
    await connectDB();
    return Invoice.find({ studentId })
      .populate("feeStructureId", "feeType amount frequency")
      .sort({ dueDate: 1 });
  },

  processPayment: async (invoiceId: string, amountToPay: number, paymentMethod: string, transactionId?: string) => {
    await connectDB();
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) throw new Error("Invoice not found");

    if (invoice.status === "PAID") {
        throw new Error("Invoice is already fully paid");
    }

    const newAmountPaid = invoice.amountPaid + amountToPay;
    let newStatus = "PARTIAL";
    if (newAmountPaid >= invoice.amountDue) {
        newStatus = "PAID";
    }

    invoice.amountPaid = newAmountPaid;
    invoice.status = newStatus;
    invoice.paidDate = new Date();
    invoice.paymentMethod = paymentMethod;
    invoice.transactionId = transactionId;

    return invoice.save();
  }
};
