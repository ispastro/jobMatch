
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerNewUser } from './authApi';

export const Login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await loginUser(userData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const RegisterUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await registerNewUser(userData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    Logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(Login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(RegisterUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { Logout } = authSlice.actions;
export default authSlice.reducer;
