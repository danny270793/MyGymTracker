import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { RootState } from '.'

export interface NavigatorState {
  path: string | null
}

const initialState: NavigatorState = {
  path: null,
}

export const navigatorSlice = createSlice({
  name: 'navigator',
  initialState,
  reducers: {
    navigate: (state: NavigatorState, action: PayloadAction<string>) => {
      state.path = action.payload
    },
  },
})

export const navigatorActions = navigatorSlice.actions
export const navigatorReducer = navigatorSlice.reducer
export const navigatorSelector = <T extends keyof NavigatorState>(
  value: T,
): NavigatorState[T] => {
  return useSelector((state: RootState) => state.navigator[value])
}
