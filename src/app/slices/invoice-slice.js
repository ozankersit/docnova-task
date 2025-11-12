import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchInvoices } from '../services/invoice-service'

export const getInvoices = createAsyncThunk(
  'invoice/getInvoices',
  async ({ token, body }, thunkAPI) => {
    try {
      const data = await fetchInvoices(token, body)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload?.invoices?.content || []
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default invoiceSlice.reducer
