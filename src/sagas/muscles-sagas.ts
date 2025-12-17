import { call, put, takeLatest, type ForkEffect } from 'redux-saga/effects'
import { musclesActions, type CreateMusclePayload } from '../slices/muscles-slice'
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

export const musclesSagas: ForkEffect[] = [
  takeLatest(musclesActions.fetchRequested.type, fetchMusclesSaga),
  takeLatest(musclesActions.createRequested.type, createMuscleSaga),
]

