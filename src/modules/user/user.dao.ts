import User from "@/src/modules/user/user.model";

export const userDao = {
  create: (userData: any) => User.create(userData),
  findByEmail: (email: string) => User.findOne({ email }),
  findById: (id: string) => User.findById(id),
  findByUniqueId: (uniqueId: string) => User.findOne({ uniqueId }),
  update: (id: string, updateData: any) =>
    User.findByIdAndUpdate(id, updateData, { new: true }),
  delete: (id: string) => User.findByIdAndDelete(id),
  findAll: async (skip: number, limit: number, role?: string) => {
    const filter: any = {};

    if (role) {
      filter.role = role;
    }

    return await User.find(filter).skip(skip).limit(limit);
  },
  count: async (role?: string) => {
    const filter: any = {};

    if (role) {
      filter.role = role;
    }

    return await User.countDocuments(filter);
  },
};
