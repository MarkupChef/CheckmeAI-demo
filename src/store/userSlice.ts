import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  darkMode: undefined | boolean;
}

const initialState: InitialState = {
  darkMode: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    switchTheme(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
  },
});

export const { switchTheme } = userSlice.actions;

export default userSlice.reducer;
