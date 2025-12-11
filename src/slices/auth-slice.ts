import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { RootState } from '.'

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  tokenType: string | null
  state:
    | 'login-requested'
    | 'login-success'
    | 'login-error'
    | 'logout-requested'
    | 'logout-success'
    | 'logout-error'
    | null
  error: Error | null
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  tokenType: localStorage.getItem('tokenType') || null,
  state: null,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequested: (state: AuthState) => {
      state.state = 'login-requested'
      state.error = null
    },
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        tokenType: string
      }>,
    ) => {
      state.state = 'login-success'
      state.error = null

      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.tokenType = action.payload.tokenType

      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      localStorage.setItem('tokenType', action.payload.tokenType)
    },
    loginError: (state: AuthState, action: PayloadAction<Error>) => {
      state.state = 'login-error'
      state.error = action.payload
    },
    logoutRequested: (state: AuthState) => {
      state.state = 'logout-requested'
      state.error = null
    },
    logoutSuccess: (state: AuthState) => {
      state.state = 'logout-success'
      state.error = null

      state.accessToken = null
      state.refreshToken = null
      state.tokenType = null

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('tokenType')
    },
    logoutError: (state: AuthState, action: PayloadAction<Error>) => {
      state.state = 'logout-error'
      state.error = action.payload
    },
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
export const authSelector = <T extends keyof AuthState>(
  value: T,
): AuthState[T] => {
  return useSelector((state: RootState) => state.auth[value])
}
