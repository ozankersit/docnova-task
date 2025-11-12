import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginRequest } from '../services/auth-service'

const storedJwt = localStorage.getItem('jwt')

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await loginRequest(email, password)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    jwt: storedJwt || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { jwt, user } = action.payload
      state.jwt = jwt
      state.user = user
      localStorage.setItem('jwt', jwt)
    },
    logout: (state) => {
      state.jwt = null
      state.user = null
      localStorage.removeItem('jwt')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.jwt = action.payload.jwt
        state.user = action.payload.user

        localStorage.setItem('jwt', action.payload.jwt)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, loginSuccess } = authSlice.actions
export default authSlice.reducer
