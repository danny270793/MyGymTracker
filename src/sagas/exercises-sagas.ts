import { call, put, takeLatest, type ForkEffect } from 'redux-saga/effects'
import {
  exercisesActions,
  type FetchExercisesPayload,
  type CreateExercisePayload,
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

function* createExerciseSaga(action: PayloadAction<CreateExercisePayload>) {
  try {
    logger.debug(`creating exercise: ${action.payload.name}`)
    const exercise: Exercise = yield call(
      backend.createExercise,
      action.payload.name,
      action.payload.muscleId,
    )
    logger.debug(`exercise created: ${exercise.id}`)
    yield put(exercisesActions.createSuccess(exercise))
  } catch (error) {
    logger.error('create exercise error', error)
    yield put(exercisesActions.createError(error as Error))
  }
}

export const exercisesSagas: ForkEffect[] = [
  takeLatest(exercisesActions.fetchRequested.type, fetchExercisesSaga),
  takeLatest(exercisesActions.createRequested.type, createExerciseSaga),
]

