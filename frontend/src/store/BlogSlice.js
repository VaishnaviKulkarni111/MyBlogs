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
    console.log("bloglist in redux", data)
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const editBlog = createAsyncThunk("blog/editBlog", async ({ id, blogData }) => {
    const response = await axios.put(`http://localhost:5000/blogs/${id}`, blogData);
    return response.data.data;
  });
  
  // Delete Blog
  export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (id) => {
    await axios.delete(`http://localhost:5000/blogs/${id}`);
    return id;
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
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        const index = state.blogs.data.findIndex((blog) => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs.data[index] = action.payload;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs.data = state.blogs.data.filter((blog) => blog._id !== action.payload);
      });

  },
});

export default blogSlice.reducer;
