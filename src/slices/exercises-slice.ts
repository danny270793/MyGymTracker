import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { RootState } from '.'
import type { Exercise } from '../services/backend'

export interface FetchExercisesPayload {
  muscleId: number
}

export interface CreateExercisePayload {
  name: string
  muscleId: number
}

export interface ExercisesState {
  exercises: Exercise[]
  currentMuscleId: number | null
  state: 'idle' | 'loading' | 'success' | 'error'
  createState: 'idle' | 'creating' | 'success' | 'error'
  error: Error | null
}

const initialState: ExercisesState = {
  exercises: [],
  currentMuscleId: null,
  state: 'idle',
  createState: 'idle',
  error: null,
}

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    fetchRequested: (
      state: ExercisesState,
      action: PayloadAction<FetchExercisesPayload>,
    ) => {
      state.state = 'loading'
      state.currentMuscleId = action.payload.muscleId
      state.error = null
    },
    fetchSuccess: (state: ExercisesState, action: PayloadAction<Exercise[]>) => {
      state.state = 'success'
      state.exercises = action.payload
      state.error = null
    },
    fetchError: (state: ExercisesState, action: PayloadAction<Error>) => {
      state.state = 'error'
      state.error = action.payload
    },
    createRequested: (
      state: ExercisesState,
      _action: PayloadAction<CreateExercisePayload>,
    ) => {
      state.createState = 'creating'
      state.error = null
    },
    createSuccess: (state: ExercisesState, action: PayloadAction<Exercise>) => {
      state.createState = 'success'
      state.exercises.push(action.payload)
      state.error = null
    },
    createError: (state: ExercisesState, action: PayloadAction<Error>) => {
      state.createState = 'error'
      state.error = action.payload
    },
    resetCreateState: (state: ExercisesState) => {
      state.createState = 'idle'
      state.error = null
    },
    reset: (state: ExercisesState) => {
      state.exercises = []
      state.currentMuscleId = null
      state.state = 'idle'
      state.createState = 'idle'
      state.error = null
    },
  },
})

export const exercisesActions = exercisesSlice.actions
export const exercisesReducer = exercisesSlice.reducer
export const exercisesSelector = <T extends keyof ExercisesState>(
  value: T,
): ExercisesState[T] => {
  return useSelector((state: RootState) => state.exercises[value])
}

