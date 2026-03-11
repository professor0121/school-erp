import { connectDB } from "@/src/lib/mongodb";
import { Announcement } from "./announcement.model";

export const announcementService = {
  createAnnouncement: async (data: any) => {
    await connectDB();
    return Announcement.create(data);
  },

  getAnnouncements: async (role: string, sectionId?: string) => {
    await connectDB();
    const query: any = {
      $or: [
        { targetRoles: "ALL" },
        { targetRoles: role }
      ]
    };

    // If section specific announcements are needed
    if (sectionId) {
      query.$or.push({ targetSectionId: sectionId });
    }

    // Filter out expired announcements
    query.$and = [
      {
        $or: [
          { expiresAt: { $exists: false } },
          { expiresAt: null },
          { expiresAt: { $gt: new Date() } }
        ]
      }
    ];

    return Announcement.find(query)
      .populate("authorId", "name role")
      .sort({ isUrgent: -1, createdAt: -1 });
  }
};
