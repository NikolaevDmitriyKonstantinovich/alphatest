import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const persistConfig = {
  key: 'root',
  storage
};

const persistedCurrencyReducer = persistReducer(persistConfig, currencyReducer);

export const rootReducer = combineReducers({
  currency: persistedCurrencyReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
