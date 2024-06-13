import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from './slices/budgetSlice';
import usersReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    budget: budgetReducer,
    users: usersReducer,
  },
});

export default store;
