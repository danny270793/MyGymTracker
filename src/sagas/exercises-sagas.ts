import { call, put, takeLatest, type ForkEffect } from 'redux-saga/effects'
import {
  exercisesActions,
  type FetchExercisesPayload,
} from '../slices/exercises-slice'
import { backend, type Exercise } from '../services/backend'
import { Logger } from '../utils/logger'
import type { PayloadAction } from '@reduxjs/toolkit'

const logger = new Logger('./src/sagas/exercises-sagas.ts')

function* fetchExercisesSaga(action: PayloadAction<FetchExercisesPayload>) {
  try {
    logger.debug(`fetching exercises for muscle: ${action.payload.muscleId}`)
    const exercises: Exercise[] = yield call(
      backend.getExercisesByMuscle,
      action.payload.muscleId,
    )
    logger.debug(`exercises fetched: ${exercises.length} items`)
    yield put(exercisesActions.fetchSuccess(exercises))
  } catch (error) {
    logger.error('fetch exercises error', error)
    yield put(exercisesActions.fetchError(error as Error))
  }
}

export const exercisesSagas: ForkEffect[] = [
  takeLatest(exercisesActions.fetchRequested.type, fetchExercisesSaga),
]

