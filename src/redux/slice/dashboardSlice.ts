import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/src/lib/axios';

// Define the shape of the dashboard stats
export interface DashboardStats {
  totalStudents: number;
  totalStaff: number;
  activeParents: number;
  totalRevenue: number;
}

export interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

// Async thunk to fetch dashboard stats
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      // Note: Replacing with actual endpoint when available. 
      // This is a placeholder for the real API call.
      // const response = await axiosInstance.get('/admin/dashboard/stats');
      // return response.data;
      
      // Mocking response for now to allow UI development
      return new Promise<DashboardStats>((resolve) => {
        setTimeout(() => {
          resolve({
            totalStudents: 2845,
            totalStaff: 152,
            activeParents: 1930,
            totalRevenue: 124500,
          });
        }, 1000);
      });
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action: PayloadAction<DashboardStats>) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
