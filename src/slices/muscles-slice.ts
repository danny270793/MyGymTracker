import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { RootState } from '.'
import type { Muscle } from '../services/backend'

export interface MusclesState {
  muscles: Muscle[]
  state: 'idle' | 'loading' | 'success' | 'error'
  error: Error | null
}

const initialState: MusclesState = {
  muscles: [],
  state: 'idle',
  error: null,
}

export const musclesSlice = createSlice({
  name: 'muscles',
  initialState,
  reducers: {
    fetchRequested: (state: MusclesState) => {
      state.state = 'loading'
      state.error = null
    },
    fetchSuccess: (state: MusclesState, action: PayloadAction<Muscle[]>) => {
      state.state = 'success'
      state.muscles = action.payload
      state.error = null
    },
    fetchError: (state: MusclesState, action: PayloadAction<Error>) => {
      state.state = 'error'
      state.error = action.payload
    },
    reset: (state: MusclesState) => {
      state.muscles = []
      state.state = 'idle'
      state.error = null
    },
  },
})

export const musclesActions = musclesSlice.actions
export const musclesReducer = musclesSlice.reducer
export const musclesSelector = <T extends keyof MusclesState>(
  value: T,
): MusclesState[T] => {
  return useSelector((state: RootState) => state.muscles[value])
}

