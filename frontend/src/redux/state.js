import { createSlice} from '@reduxjs/toolkit';

const InitialState = {
  user: null,
  token: null,
}


export const userSlice = createSlice({
  name: 'user',
  initialState: InitialState,
  reducers: {
    setSignIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setSignIn, logout } = userSlice.actions;
export default userSlice.reducer;