import { configureStore } from "@reduxjs/toolkit";
import authSlice from './Authslice.js'


const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default Store;
