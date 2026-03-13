import { connectDB } from "@/src/lib/mongodb";
import { userDao } from "./user.dao";
import { hashPassword } from "@/src/utils/bcryptUtil";
export const userService = {
  createUser: async (req: Request) => {
    await connectDB();
    const { name, uniqueId, email, password, role } = await req.json();
    if (!name || !uniqueId || !email || !password || !role) {
      return new Error("Missing required fields");
    }
    const existingUser = await userDao.findByUniqueId(uniqueId);
    if (existingUser) {
      return new Error("User with this unique ID already exists");
    }
    const existingEmail = await userDao.findByEmail(email);
    if (existingEmail) {
      return new Error("User with this email already exists");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await userDao.create({
      name,
      uniqueId,
      email,
      password: hashedPassword,
      role,
    });
    return newUser;
  },
getUsers: async (page: number, limit: number, role?: string) => {
  await connectDB();

  const skip = (page - 1) * limit;

  const users = await userDao.findAll(skip, limit, role);
  const total = await userDao.count(role);

  return {
    users,
    total,
    page,
    limit,
  };
},
  getUserById: async (id: string) => {
    await connectDB();
    const user = await userDao.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
  updateUser: async (id: string, updateData: any) => {
    await connectDB();
    const user = await userDao.update(id, updateData);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
  deleteUser: async (id: string) => {
    await connectDB();
    const user = await userDao.delete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
};
