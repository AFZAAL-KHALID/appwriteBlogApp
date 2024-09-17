import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authslice.js'


const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default Store;
