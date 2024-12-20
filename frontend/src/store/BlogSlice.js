import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions
export const createBlog = createAsyncThunk('blogs/createBlog', async (blogData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('http://localhost:5000/blogs', blogData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('http://localhost:5000/blogs');
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Slice
const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
