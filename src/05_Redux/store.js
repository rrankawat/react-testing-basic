import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './01_Counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
