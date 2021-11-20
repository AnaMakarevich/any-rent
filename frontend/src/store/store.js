import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../slices/itemSlice';
import profileReducer from '../slices/profileSlice';

const store = configureStore({
  reducer: {
      item: itemReducer,
      profile: profileReducer
  },
})

export default store;