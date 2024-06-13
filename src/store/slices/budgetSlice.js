import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  saveMonth: Number(localStorage.getItem('month')),
};
export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setSaveMonth: (state, action) => {
      state.saveMonth = action.payload;
    },
  },
});

export const { setSaveMonth } = budgetSlice.actions;
export default budgetSlice.reducer;
