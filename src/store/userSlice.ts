import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  darkMode: undefined | boolean;
  isNewUser?: boolean;
}

const initialState: InitialState = {
  darkMode: undefined,
  isNewUser: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    switchTheme(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },

    setIsNewUser(state, action: PayloadAction<boolean>) {
      state.isNewUser = action.payload;
    },
  },
});

export const { switchTheme, setIsNewUser } = userSlice.actions;

export default userSlice.reducer;
