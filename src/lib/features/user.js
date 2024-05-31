import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  firstname: null,
  lastname: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.firstname = action.payload.firstname,
      state.lastname = action.payload.lastname,
      state.email = action.payload.email
    },
  },
});

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;