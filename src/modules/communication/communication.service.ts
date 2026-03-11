import { connectDB } from "@/src/lib/mongodb";
import { Appointment } from "./communication.model";

export const communicationService = {
  requestAppointment: async (data: any) => {
    await connectDB();
    return Appointment.create(data);
  },

  getAppointmentsForParent: async (parentId: string) => {
    await connectDB();
    return Appointment.find({ parentId })
      .populate("teacherId", "name uniqueId")
      .populate("studentId", "name uniqueId rollNumber")
      .sort({ scheduledDate: 1 });
  },

  getAppointmentsForTeacher: async (teacherId: string) => {
    await connectDB();
    return Appointment.find({ teacherId })
      .populate("parentId", "name uniqueId phone")
      .populate("studentId", "name uniqueId rollNumber")
      .sort({ scheduledDate: 1 });
  },

  updateAppointmentStatus: async (id: string, updateData: any) => {
    await connectDB();
    return Appointment.findByIdAndUpdate(id, updateData, { new: true });
  }
};
