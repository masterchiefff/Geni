import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Agent {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AgentsState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
}

const initialState: AgentsState = {
  agents: [],
  loading: false,
  error: null,
};

export const fetchAgents = createAsyncThunk<Agent[]>('agents/fetchAgents', async () => {
  const response = await axios.get('https://api.geni.africa/agents');
  return response.data;
});

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgents.fulfilled, (state, action: PayloadAction<Agent[]>) => {
        state.loading = false;
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch agents';
      });
  },
});

export default agentsSlice.reducer;