import type { PayloadAction } from '@reduxjs/toolkit'
import {
  authActions,
  type LoginCredentials,
  type RegisterCredentials,
} from '../slices/auth-slice'
import { put, takeLatest, call, type ForkEffect } from 'redux-saga/effects'
import { Logger } from '../utils/logger'
import { supabase } from '../services/supabase'
import type { AuthResponse } from '@supabase/supabase-js'

const logger = new Logger('./src/sagas/auth-sagas.ts')

function* loginSaga(action: PayloadAction<LoginCredentials>) {
  logger.debug('loginSaga started', JSON.stringify(action.payload))
  try {
    const { email, password } = action.payload

    // Authenticate with Supabase using email/password
    const response: AuthResponse = yield call(
      [supabase.auth, supabase.auth.signInWithPassword],
      {
        email,
        password,
      },
    )

    if (response.error) {
      throw new Error(
        response.error.message === 'Invalid login credentials'
          ? 'invalidCredentials'
          : response.error.message,
      )
    }

    if (!response.data.session) {
      throw new Error('invalidCredentials')
    }

    yield put(
      authActions.loginSuccess({
        accessToken: response.data.session.access_token,
        refreshToken: response.data.session.refresh_token,
        tokenType: response.data.session.token_type,
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
    // Sign out from Supabase
    const { error } = yield call([supabase.auth, supabase.auth.signOut])

    if (error) {
      throw error
    }

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

    // Register with Supabase using email/password
    const response: AuthResponse = yield call([supabase.auth, supabase.auth.signUp], {
      email,
      password,
    })

    if (response.error) {
      // Map common Supabase errors to i18n keys
      let errorKey = response.error.message
      if (response.error.message.includes('already registered')) {
        errorKey = 'emailAlreadyRegistered'
      } else if (response.error.message.includes('valid email')) {
        errorKey = 'emailInvalid'
      } else if (response.error.message.includes('password')) {
        errorKey = 'passwordTooWeak'
      }
      throw new Error(errorKey)
    }

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
