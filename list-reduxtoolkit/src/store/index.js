import { configureStore } from '@reduxjs/toolkit';
import sortordReducer from './features/sortord/sortordSlice';

const store = configureStore({
  reducer: {
    sortord: sortordReducer
  }
}); // redux-toolkit内置了redux-thunk

export default store;