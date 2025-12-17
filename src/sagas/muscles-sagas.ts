import { call, put, takeLatest, type ForkEffect } from 'redux-saga/effects'
import {
  musclesActions,
  type CreateMusclePayload,
  type UpdateMusclePayload,
  type DeleteMusclePayload,
} from '../slices/muscles-slice'
import { backend, type Muscle } from '../services/backend'
import { Logger } from '../utils/logger'
import type { PayloadAction } from '@reduxjs/toolkit'

const logger = new Logger('./src/sagas/muscles-sagas.ts')

function* fetchMusclesSaga() {
  try {
    logger.debug('fetching muscles')
    const muscles: Muscle[] = yield call(backend.getMuscles)
    logger.debug(`muscles fetched: ${muscles.length} items`)
    yield put(musclesActions.fetchSuccess(muscles))
  } catch (error) {
    logger.error('fetch muscles error', error)
    yield put(musclesActions.fetchError(error as Error))
  }
}

function* createMuscleSaga(action: PayloadAction<CreateMusclePayload>) {
  try {
    logger.debug(`creating muscle: ${action.payload.name}`)
    const muscle: Muscle = yield call(backend.createMuscle, action.payload.name)
    logger.debug(`muscle created: ${muscle.id}`)
    yield put(musclesActions.createSuccess(muscle))
  } catch (error) {
    logger.error('create muscle error', error)
    yield put(musclesActions.createError(error as Error))
  }
}

function* updateMuscleSaga(action: PayloadAction<UpdateMusclePayload>) {
  try {
    logger.debug(`updating muscle: ${action.payload.id}`)
    const muscle: Muscle = yield call(
      backend.updateMuscle,
      action.payload.id,
      action.payload.name,
    )
    logger.debug(`muscle updated: ${muscle.id}`)
    yield put(musclesActions.updateSuccess(muscle))
  } catch (error) {
    logger.error('update muscle error', error)
    yield put(musclesActions.updateError(error as Error))
  }
}

function* deleteMuscleSaga(action: PayloadAction<DeleteMusclePayload>) {
  try {
    logger.debug(`deleting muscle: ${action.payload.id}`)
    yield call(backend.deleteMuscle, action.payload.id)
    logger.debug(`muscle deleted: ${action.payload.id}`)
    yield put(musclesActions.deleteSuccess(action.payload.id))
  } catch (error) {
    logger.error('delete muscle error', error)
    yield put(musclesActions.deleteError(error as Error))
  }
}

export const musclesSagas: ForkEffect[] = [
  takeLatest(musclesActions.fetchRequested.type, fetchMusclesSaga),
  takeLatest(musclesActions.createRequested.type, createMuscleSaga),
  takeLatest(musclesActions.updateRequested.type, updateMuscleSaga),
  takeLatest(musclesActions.deleteRequested.type, deleteMuscleSaga),
]

