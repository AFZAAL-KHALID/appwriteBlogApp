import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js'


const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default Store;
