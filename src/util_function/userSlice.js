// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialUserState = {username:null, email:null,id:null,access_token:null }
const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    addUser: (state, action) => {
      return action.payload
    },
    removeUser: (state, action) => {
      return null
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
