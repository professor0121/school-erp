import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./slice/theme";
import authReducer from "./slice/authSlice";
import dashboardReducer from "./slice/dashboardSlice";
import usersReducer from "./slice/usersSlice";

const store=configureStore({
    reducer:{
        theme:themeReducer,
        auth: authReducer,
        dashboard: dashboardReducer,
        users: usersReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;