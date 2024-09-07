import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CallState {
  isCallActive: boolean;
  isKeypadOpen: boolean;
  phoneNumber: string;
  isMuted: boolean;
  isSpeakerOn: boolean;
}

const initialState: CallState = {
  isCallActive: false,
  isKeypadOpen: false,
  phoneNumber: '',
  isMuted: false,
  isSpeakerOn: false,
};

const callWidgetSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    toggleCall: (state) => {
      state.isCallActive = !state.isCallActive;
    },
    setKeypadOpen: (state, action: PayloadAction<boolean>) => {
      state.isKeypadOpen = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setIsMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    setIsSpeakerOn: (state, action: PayloadAction<boolean>) => {
      state.isSpeakerOn = action.payload;
    },
  },
});

export const { toggleCall, setKeypadOpen, setPhoneNumber, setIsMuted, setIsSpeakerOn } = callWidgetSlice.actions;
export default callWidgetSlice.reducer;