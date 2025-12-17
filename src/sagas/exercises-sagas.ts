import { call, put, takeLatest, type ForkEffect } from 'redux-saga/effects'
import {
  exercisesActions,
  type FetchExercisesPayload,
  type CreateExercisePayload,
  type UpdateExercisePayload,
  type DeleteExercisePayload,
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

function* updateExerciseSaga(action: PayloadAction<UpdateExercisePayload>) {
  try {
    logger.debug(`updating exercise: ${action.payload.id}`)
    const exercise: Exercise = yield call(
      backend.updateExercise,
      action.payload.id,
      action.payload.name,
    )
    logger.debug(`exercise updated: ${exercise.id}`)
    yield put(exercisesActions.updateSuccess(exercise))
  } catch (error) {
    logger.error('update exercise error', error)
    yield put(exercisesActions.updateError(error as Error))
  }
}

function* deleteExerciseSaga(action: PayloadAction<DeleteExercisePayload>) {
  try {
    logger.debug(`deleting exercise: ${action.payload.id}`)
    yield call(backend.deleteExercise, action.payload.id)
    logger.debug(`exercise deleted: ${action.payload.id}`)
    yield put(exercisesActions.deleteSuccess(action.payload.id))
  } catch (error) {
    logger.error('delete exercise error', error)
    yield put(exercisesActions.deleteError(error as Error))
  }
}

export const exercisesSagas: ForkEffect[] = [
  takeLatest(exercisesActions.fetchRequested.type, fetchExercisesSaga),
  takeLatest(exercisesActions.createRequested.type, createExerciseSaga),
  takeLatest(exercisesActions.updateRequested.type, updateExerciseSaga),
  takeLatest(exercisesActions.deleteRequested.type, deleteExerciseSaga),
]

