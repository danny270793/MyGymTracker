import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '.';

export interface AppState {
    error: Error | null;
}

const initialState: AppState = {
    error: null,
}

export const appSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        errorOcurred: (state: AppState, action: PayloadAction<Error>) => {
            state.error = action.payload;
        },
    },
})

export const appActions = appSlice.actions
export const appReducer = appSlice.reducer
export const appSelector = <T extends keyof AppState>(value: T): AppState[T] => {
    return useSelector((state: RootState) => state.app[value])
}
