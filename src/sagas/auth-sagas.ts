import type { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest, type ForkEffect } from 'redux-saga/effects'
import { authActions, type LoginCredentials } from '../slices/auth-slice'
import { backend, type LoginResponse } from '../services/backend'
import { navigatorActions } from '../slices/navigator-slice'
import { Logger } from '../utils/logger'

const logger = new Logger('./src/sagas/auth-sagas.ts')

function* loginSaga(action: PayloadAction<LoginCredentials>) {
  logger.debug('loginSaga started')
  try {
    const response: LoginResponse = yield call(
      backend.login,
      action.payload.email,
      action.payload.password,
    )
    yield put(authActions.loginSuccess(response))
    yield put(navigatorActions.navigate('/home'))
  } catch (error) {
    logger.error('login error', error)
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
    yield put(navigatorActions.navigate('/login'))
  } catch (error) {
    logger.error('logout error', error)
    yield put(
      authActions.logoutError(
        error instanceof Error
          ? error
          : new Error('Unknown error running logout saga'),
      ),
    )
  }
}

function* registerSaga(
  action: PayloadAction<{ email: string; password: string }>,
) {
  logger.debug('registerSaga started')
  try {
    yield call(backend.register, action.payload.email, action.payload.password)
    yield put(authActions.registerSuccess())
  } catch (error) {
    logger.error('register error', error)
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
