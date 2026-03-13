import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/src/lib/axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  totalCount: 0,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    {
      role,
      page = 1,
      limit = 10,
    }: { role?: string; page?: number; limit?: number },
    { rejectWithValue },
  ) => {
    try {
      // Endpoint should handle pagination and role filtering
      const response = await axiosInstance.get("/user", {
        params: { role, page, limit },
      });

      return response.data.data;
      // Assuming response.data has { data: User[], total: number }
    } catch (error: any) {
      // Fallback to mock data if API is not fully ready
      return new Promise<{ data: User[]; total: number }>((resolve) => {
        setTimeout(() => {
          resolve({
            data: [
              {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                role: role || "student",
                status: "Active",
                createdAt: "2023-01-15",
              },
              {
                id: "2",
                name: "Jane Smith",
                email: "jane@example.com",
                role: role || "teacher",
                status: "Active",
                createdAt: "2023-02-20",
              },
              {
                id: "3",
                name: "Alice Johnson",
                email: "alice@example.com",
                role: role || "student",
                status: "Inactive",
                createdAt: "2023-03-05",
              },
              {
                id: "4",
                name: "Bob Williams",
                email: "bob@example.com",
                role: role || "parent",
                status: "Active",
                createdAt: "2023-04-10",
              },
            ],
            total: 4,
          });
        }, 800);
      });
      // return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalCount = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
