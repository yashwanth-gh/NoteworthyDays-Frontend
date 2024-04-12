import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AuthState {
    id: string;
    isLoggedIn: boolean;
    isVerified: boolean;
    fullName: string;
    email: string;
    profilePicUrl: string;
    role: 'user' | 'admin';
    accountStatus: "active" | "pending" | "suspended" | "blocked" | 'unknown';
}

const initialState: AuthState = {
    id: '',
    isLoggedIn: false,
    isVerified: false,
    fullName: '',
    email: '',
    profilePicUrl: '',
    role: 'user',
    accountStatus: 'unknown'
}

export const appSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.id = action.payload.id;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.isVerified = action.payload.isVerified;
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.profilePicUrl = action.payload.profilePicUrl;
            state.role = action.payload.role;
            state.accountStatus = action.payload.accountStatus;
        },
        clearAuth: (state) => {
            Object.assign(state, initialState);
        }
    }
})

export const { setAuth, clearAuth } = appSlice.actions;
export default appSlice.reducer;