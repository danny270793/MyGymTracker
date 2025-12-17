import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { authReducer } from './auth-slice'
import { musclesReducer } from './muscles-slice'
import { exercisesReducer } from './exercises-slice'
import { Logger } from '../utils/logger'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../sagas'
import { navigatorReducer } from './navigator-slice'

const logger = new Logger('./src/slices/index.ts')

const hasType = (obj: unknown): obj is { type: string } => {
  return typeof obj === 'object' && obj !== null && 'type' in obj
}

const loggerMiddleware: Middleware = (_) => (next) => (action: unknown) => {
  const actionType = hasType(action) ? action.type : 'UNKNOWN_ACTION'
  logger.debug(`action.type: ${actionType}`)
  return next(action)
}

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    navigator: navigatorReducer,
    auth: authReducer,
    muscles: musclesReducer,
    exercises: exercisesReducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware, loggerMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
