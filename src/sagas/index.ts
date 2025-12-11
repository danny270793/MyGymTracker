import { all } from "redux-saga/effects";
import { watchAuth } from "./auth-sagas";

export function* rootSaga() {
    yield all([
        watchAuth()
    ])
}
