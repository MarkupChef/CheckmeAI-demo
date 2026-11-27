import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  mode_id: string | null;
}

const initialState: InitialState = {
  mode_id: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentSlice: () => initialState,
    setPaymentMode(state, action: PayloadAction<{ mode_id: string }>) {
      state.mode_id = action.payload.mode_id;
    },
  },
});

export const { clearPaymentSlice, setPaymentMode } = paymentSlice.actions;

export default paymentSlice.reducer;
