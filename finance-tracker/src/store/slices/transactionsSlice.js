import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { transactionService } from '../../services/transactionService';

export const fetchTransactions = createAsyncThunk('transactions/fetchAll', async (_, { rejectWithValue }) => {
  try { return await transactionService.getAll(); }
  catch (e) { return rejectWithValue(e.message); }
});

export const addTransaction = createAsyncThunk('transactions/add', async (data, { rejectWithValue }) => {
  try { return await transactionService.create(data); }
  catch (e) { return rejectWithValue(e.message); }
});

export const updateTransaction = createAsyncThunk('transactions/update', async ({ id, data }, { rejectWithValue }) => {
  try { return await transactionService.update(id, data); }
  catch (e) { return rejectWithValue(e.message); }
});

export const deleteTransaction = createAsyncThunk('transactions/delete', async (id, { rejectWithValue }) => {
  try { return await transactionService.delete(id); }
  catch (e) { return rejectWithValue(e.message); }
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: { items: [], status: 'idle', error: null, filter: 'all', search: '' },
  reducers: {
    setFilter: (state, action) => { state.filter = action.payload; },
    setSearch: (state, action) => { state.search = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending,  (state) => { state.status = 'loading'; })
      .addCase(fetchTransactions.fulfilled,(state, { payload }) => { state.status = 'succeeded'; state.items = payload; })
      .addCase(fetchTransactions.rejected, (state, { payload }) => { state.status = 'failed'; state.error = payload; })
      .addCase(addTransaction.fulfilled,   (state, { payload }) => { state.items.unshift(payload); })
      .addCase(updateTransaction.fulfilled,(state, { payload }) => {
        const idx = state.items.findIndex(t => t.id === payload.id);
        if (idx !== -1) state.items[idx] = payload;
      })
      .addCase(deleteTransaction.fulfilled,(state, { payload }) => {
        state.items = state.items.filter(t => t.id !== payload);
      });
  },
});

export const { setFilter, setSearch } = transactionsSlice.actions;
export default transactionsSlice.reducer;
