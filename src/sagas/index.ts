import { all, call, put, spawn, type ForkEffect } from 'redux-saga/effects'
import { sessionSagas } from './auth-sagas'
import { musclesSagas } from './muscles-sagas'
import { exercisesSagas } from './exercises-sagas'
import { Logger } from '../utils/logger'
import { navigatorActions } from '../slices/navigator-slice'

const logger = new Logger('./src/sagas/index.ts')

export const sagas: ForkEffect[] = [
  ...sessionSagas,
  ...musclesSagas,
  ...exercisesSagas,
]

export const rootSaga = function* () {
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        try {
          yield call(function* () {
            yield saga
          })
        } catch (error) {
          logger.error('general error on sagas', error)
          yield put(navigatorActions.navigate('/error'))
        }
      }),
    ),
  )
}
