import type { PayloadAction } from '@reduxjs/toolkit'
import {
  authActions,
  type LoginCredentials,
  type RegisterCredentials,
} from '../slices/auth-slice'
import { put, takeLatest, call, type ForkEffect } from 'redux-saga/effects'
import { Logger } from '../utils/logger'
import { backend, type LoginResponse } from '../services/backend'

const logger = new Logger('./src/sagas/auth-sagas.ts')

function* loginSaga(action: PayloadAction<LoginCredentials>) {
  logger.debug('loginSaga started', JSON.stringify(action.payload))
  try {
    const { email, password } = action.payload

    const response: LoginResponse = yield call(backend.login, email, password)

    yield put(authActions.loginSuccess(response))
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
    yield call(backend.logout)

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

function* registerSaga(action: PayloadAction<RegisterCredentials>) {
  logger.debug('registerSaga started', JSON.stringify(action.payload))
  try {
    const { email, password } = action.payload

    yield call(backend.register, email, password)

    yield put(authActions.registerSuccess())
  } catch (error) {
    yield put(
      authActions.registerError(
        error instanceof Error
          ? error
          : new Error('Unknown error running register saga'),
      ),
    )
  }
}

export const sessionSagas: ForkEffect[] = [
  takeLatest(authActions.loginRequested.type, loginSaga),
  takeLatest(authActions.logoutRequested.type, logoutSaga),
  takeLatest(authActions.registerRequested.type, registerSaga),
]
