import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import authSlice from "./authSlice";
=======
import authSlice from './authSlice.js'

>>>>>>> 6e3771a197f250e0cd45465199aa8fd619b20e6e

const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default Store;
