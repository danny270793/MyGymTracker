import { all, call, put, spawn, type ForkEffect } from "redux-saga/effects";
import { sessionSagas } from "./auth-sagas";
import { Logger } from "../utils/logger";
import { appActions } from "../slices/app-slice";

const logger = new Logger('./src/sagas/index.ts');

export const sagas: ForkEffect[] = [
    ...sessionSagas
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
            yield put(appActions.errorOcurred(error instanceof Error ? error : new Error('Unknown error running saga')))
          }
        }),
      ),
    )
  }