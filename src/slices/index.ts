import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { authReducer } from './auth-slice';
import { Logger } from '../utils/logger';

const logger = new Logger('./src/slices/index.ts');

const hasType = (obj: unknown): obj is { type: string } => {
    return typeof obj === 'object' && obj !== null && 'type' in obj;
}

const loggerMiddleware: Middleware = (_) => (next) => (action: unknown) => {
    const actionType = hasType(action) ? action.type : 'UNKNOWN_ACTION';
    logger.debug(`action.type: ${actionType}`);
    return next(action);
  };
  

export const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
