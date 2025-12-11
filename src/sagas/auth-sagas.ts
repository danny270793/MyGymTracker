import type { PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "../slices/auth-slice";
import { delay, put, takeLatest } from "redux-saga/effects";

function* loginSaga(action: PayloadAction<{ username: string; password: string }>) {
    yield delay(3000)
    yield put(authActions.loginSuccess({ accessToken: '123', refreshToken: '456', tokenType: 'Bearer' }))
}

function* logoutSaga(action: PayloadAction<void>) {
    yield delay(3000)
    yield put(authActions.logoutSuccess())
}

export function* watchAuth() {
    yield takeLatest(authActions.loginRequested.type, loginSaga);
    yield takeLatest(authActions.logoutRequested.type, logoutSaga);
}
