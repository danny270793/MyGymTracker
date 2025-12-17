import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { RootState } from '.'
import type { Muscle } from '../services/backend'

export interface CreateMusclePayload {
  name: string
}

export interface MusclesState {
  muscles: Muscle[]
  state: 'idle' | 'loading' | 'success' | 'error'
  createState: 'idle' | 'creating' | 'success' | 'error'
  error: Error | null
}

const initialState: MusclesState = {
  muscles: [],
  state: 'idle',
  createState: 'idle',
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
    createRequested: (
      state: MusclesState,
      _action: PayloadAction<CreateMusclePayload>,
    ) => {
      state.createState = 'creating'
      state.error = null
    },
    createSuccess: (state: MusclesState, action: PayloadAction<Muscle>) => {
      state.createState = 'success'
      state.muscles.push(action.payload)
      state.error = null
    },
    createError: (state: MusclesState, action: PayloadAction<Error>) => {
      state.createState = 'error'
      state.error = action.payload
    },
    resetCreateState: (state: MusclesState) => {
      state.createState = 'idle'
      state.error = null
    },
    reset: (state: MusclesState) => {
      state.muscles = []
      state.state = 'idle'
      state.createState = 'idle'
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

