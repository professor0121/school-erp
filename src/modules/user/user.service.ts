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
};
