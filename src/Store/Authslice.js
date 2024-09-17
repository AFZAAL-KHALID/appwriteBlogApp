import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, //is  user auth or not
  userData: null,
}
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logOut: (state) => {
      state.status = false;
      state.userData = null;
    }
  }
})

export const { logIn, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
