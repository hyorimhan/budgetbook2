import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('accessToken'),
  userInfo: null,
};
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('accessToken');
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, setUserInfo, setUserImg } = userSlice.actions;
export default userSlice.reducer;
