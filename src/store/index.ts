import { combineReducers, configureStore } from '@reduxjs/toolkit';
import api from '@store/api/api';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import interviewReducer from './interviewSlice';
import paymentReducer from './paymentSlice';
import questionsReducer from './questionsSlice';
import userReducer from './userSlice';

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key: string, value: string) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: [api.reducerPath],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userReducer,
  questions: questionsReducer,
  interview: interviewReducer,
  payment: paymentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([api.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// state without saved values, the server renders with it, so it must be read before persistStore
export const serverState = store.getState();
export const persistor = persistStore(store);
export default store;
