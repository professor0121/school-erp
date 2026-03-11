import { connectDB } from "@/src/lib/mongodb";
import { Leave, ILeave } from "./leave.model";

export const leaveService = {
  applyForLeave: async (data: Partial<ILeave>) => {
    await connectDB();
    return Leave.create(data);
  },

  getLeavesByUser: async (userId: string) => {
    await connectDB();
    return Leave.find({ userId }).sort({ startDate: -1 });
  },

  getAllPendingLeaves: async () => {
    await connectDB();
    return Leave.find({ status: "PENDING" })
      .populate("userId", "name uniqueId role")
      .sort({ createdAt: -1 });
  },

  updateLeaveStatus: async (leaveId: string, status: "APPROVED" | "REJECTED", approvedBy: string, rejectionReason?: string) => {
    await connectDB();
    return Leave.findByIdAndUpdate(
      leaveId,
      { status, approvedBy, rejectionReason },
      { new: true }
    );
  }
};
