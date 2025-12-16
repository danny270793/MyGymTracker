import { call, put, takeLatest, type ForkEffect } from 'redux-saga/effects'
import { musclesActions } from '../slices/muscles-slice'
import { backend, type Muscle } from '../services/backend'
import { Logger } from '../utils/logger'

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

export const musclesSagas: ForkEffect[] = [
  takeLatest(musclesActions.fetchRequested.type, fetchMusclesSaga),
]

