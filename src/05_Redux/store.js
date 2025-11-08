import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './01_Counter/counterSlice'
import usersReducer from './02_Users/usersSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
})
