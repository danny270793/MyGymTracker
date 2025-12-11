import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '.';

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    tokenType: string | null;
    error: Error | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    tokenType: localStorage.getItem('tokenType') || null,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequested: (state: AuthState) => {
            state.error = null;
        },
        loginSuccess: (state: AuthState, action: PayloadAction<{ accessToken: string, refreshToken: string, tokenType: string }>) => {
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('tokenType', action.payload.tokenType);
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.tokenType = action.payload.tokenType;
            state.error = null;
        },
        loginError: (state: AuthState, action: PayloadAction<Error>) => {
            state.error = action.payload;
        },
        logoutRequested: (state: AuthState) => {
            state.error = null;
        },
        logoutSuccess: (state: AuthState) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('tokenType');
            state.accessToken = null;
            state.refreshToken = null;
            state.tokenType = null;
            state.error = null;
        },
        logoutError: (state: AuthState, action: PayloadAction<Error>) => {
            state.error = action.payload;
        },
    },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
export const authSelector = <T extends keyof AuthState>(value: T): AuthState[T] => {
    return useSelector((state: RootState) => state.auth[value])
}
