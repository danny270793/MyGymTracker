import type { PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "../slices/auth-slice";
import { delay, put, takeLatest, type ForkEffect } from "redux-saga/effects";
import { Logger } from "../utils/logger";

const logger = new Logger('./src/sagas/auth-sagas.ts');

function* loginSaga(action: PayloadAction<{ username: string; password: string }>) {
    logger.debug('loginSaga started');
    try {
        if(Math.random() > 0.5) {
            throw new Error('error reaching backend');
        }
        yield put(authActions.loginSuccess({ accessToken: '123', refreshToken: '456', tokenType: 'Bearer' }))
    } catch (error) {
        yield put(authActions.loginError(error instanceof Error ? error : new Error('Unknown error running login saga')))
    }
}

function* logoutSaga(action: PayloadAction<void>) {
    logger.debug('logoutSaga started');
    try {
        yield delay(3000)
        yield put(authActions.logoutSuccess())
    } catch (error) {
        yield put(authActions.logoutError(error instanceof Error ? error : new Error('Unknown error running logout saga')))
    }
}

export const sessionSagas: ForkEffect[] = [
    takeLatest(authActions.loginRequested.type, loginSaga),
    takeLatest(authActions.logoutRequested.type, logoutSaga)
]
