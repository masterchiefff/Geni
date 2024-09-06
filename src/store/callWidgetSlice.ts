// callWidgetSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CallWidgetState {
  isCallActive: boolean;
  isKeypadVisible: boolean;
  dialedNumber: string;
  isCalling: boolean;
  incomingNumber: string | null;
}

const initialState: CallWidgetState = {
  isCallActive: false,
  isKeypadVisible: false,
  dialedNumber: '',
  isCalling: false,
  incomingNumber: null,
};

const callWidgetSlice = createSlice({
  name: 'callWidget',
  initialState,
  reducers: {
    toggleCall(state) {
      state.isCallActive = !state.isCallActive;
      if (!state.isCallActive) {
        state.incomingNumber = null;
      }
    },
    handleDial(state, action: PayloadAction<string>) {
      state.dialedNumber += action.payload;
    },
    clearDialedNumber(state) {
      state.dialedNumber = '';
    },
    toggleKeypad(state) {
      state.isKeypadVisible = !state.isKeypadVisible;
    },
    initiateCall(state) {
      state.isCalling = true;
    },
    receiveCall(state, action: PayloadAction<string>) {
      state.incomingNumber = action.payload;
      state.isCallActive = true;
    },
    endCall(state) {
      state.isCalling = false;
      state.dialedNumber = '';
      state.incomingNumber = null;
      state.isCallActive = false;
    },
    setCallWidgetState(state, action: PayloadAction<Partial<CallWidgetState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  toggleCall,
  handleDial,
  clearDialedNumber,
  toggleKeypad,
  initiateCall,
  receiveCall,
  endCall,
  setCallWidgetState,
} = callWidgetSlice.actions;

export default callWidgetSlice.reducer;
