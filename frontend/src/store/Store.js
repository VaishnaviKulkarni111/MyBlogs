import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice'; 
import blogReducer from './BlogSlice'
const store = configureStore({
  reducer: {
    auth: authReducer, 
    blog: blogReducer
  },
});

export default store;