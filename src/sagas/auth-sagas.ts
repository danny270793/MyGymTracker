import type { PayloadAction } from '@reduxjs/toolkit'
import { authActions, type LoginCredentials } from '../slices/auth-slice'
import { put, takeLatest, delay, type ForkEffect } from 'redux-saga/effects'
import { Logger } from '../utils/logger'

const logger = new Logger('./src/sagas/auth-sagas.ts')

// Mock credentials for testing
const MOCK_USER = {
  username: 'demo',
  password: 'demo123',
}

function* loginSaga(action: PayloadAction<LoginCredentials>) {
  logger.debug('loginSaga started', JSON.stringify(action.payload))
  try {
    // Simulate network delay
    yield delay(1500)

    const { username, password } = action.payload

    // Mock authentication validation
    if (username === MOCK_USER.username && password === MOCK_USER.password) {
      yield put(
        authActions.loginSuccess({
          accessToken: `mock-access-token-${Date.now()}`,
          refreshToken: `mock-refresh-token-${Date.now()}`,
          tokenType: 'Bearer',
        }),
      )
    } else {
      throw new Error('invalidCredentials')
    }
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
