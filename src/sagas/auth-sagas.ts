import type { PayloadAction } from '@reduxjs/toolkit'
import { authActions } from '../slices/auth-slice'
import { put, takeLatest, type ForkEffect } from 'redux-saga/effects'
import { Logger } from '../utils/logger'

const logger = new Logger('./src/sagas/auth-sagas.ts')

function* loginSaga(_: PayloadAction<{ username: string; password: string }>) {
  logger.debug('loginSaga started')
  try {
    yield put(
      authActions.loginSuccess({
        accessToken: '123',
        refreshToken: '456',
        tokenType: 'Bearer',
      }),
    )
  } catch (error) {
    yield put(
      authActions.loginError(
        error instanceof Error
          ? error
          : new Error('Unknown error running login saga'),
      ),
    )
  }
}

function* logoutSaga(_: PayloadAction<void>) {
  logger.debug('logoutSaga started')
  try {
    yield put(authActions.logoutSuccess())
  } catch (error) {
    yield put(
      authActions.logoutError(
        error instanceof Error
          ? error
          : new Error('Unknown error running logout saga'),
      ),
    )
  }
}

export const sessionSagas: ForkEffect[] = [
  takeLatest(authActions.loginRequested.type, loginSaga),
  takeLatest(authActions.logoutRequested.type, logoutSaga),
]
