import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  firstname: null,
  lastname: null,
  description: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.id = action.payload.id,
      state.firstname = action.payload.firstname,
      state.lastname = action.payload.lastname,
      state.email = action.payload.email,
      state.description = action.payload.description
    },
  },
});

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;