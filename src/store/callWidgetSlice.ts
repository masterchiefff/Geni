// store/callWidgetSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CallWidgetState {
  isCallActive: boolean;
  isKeypadVisible: boolean;
  dialedNumber: string;
  isCalling: boolean;
}

const initialState: CallWidgetState = {
  isCallActive: false,
  isKeypadVisible: false,
  dialedNumber: '',
  isCalling: false,
};

const callWidgetSlice = createSlice({
  name: 'callWidget',
  initialState,
  reducers: {
    toggleCall(state) {
      state.isCallActive = !state.isCallActive;
      state.isKeypadVisible = false;
      state.isCalling = false;
      state.dialedNumber = '';
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
      state.isKeypadVisible = false;
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
  setCallWidgetState,
} = callWidgetSlice.actions;

export default callWidgetSlice.reducer;