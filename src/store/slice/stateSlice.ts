// src/features/toggle/toggleSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface ToggleState {
  value: boolean;
}

// Initial state
const initialState: ToggleState = {
  value: false,
};

// Create the slice
const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggle: (state: any) => {
      state.value = !state.value;
    },
  },
});

// Export the action
export const { toggle } = toggleSlice.actions;

// Export the reducer
export default toggleSlice.reducer;