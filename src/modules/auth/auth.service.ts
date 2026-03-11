import { userDao } from "../user/user.dao";
import { verifyPassword } from "@/src/utils/bcryptUtil";
import { generateToken } from "@/src/utils/jwtToken";
export const authService = {
  login: async (uniqueId: string, password: string) => {
    console.table({ uniqueId, password });
    if (!uniqueId && !password) {
      return { message: "Unique ID and password are required" };
    }
    const existingUser = await userDao.findByUniqueId(uniqueId);
    if (!existingUser) {
      return { message: "Invalid unique ID or password" };
    }
    const isPasswordValid = await verifyPassword(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return { message: "Invalid unique ID or password" };
    }
    const token = generateToken(existingUser._id, existingUser.role);
    return { token, user: existingUser };
  },
};
