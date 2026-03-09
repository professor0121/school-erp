export const authService = {
  Login: async (username: string, password: string) => {
    if (!username && !password) {
      return { message: "Username and password are required" };
    }
  },
};
