// src/features/payment/paymentSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface PaymentState {
  value: boolean;
}

// Initial state
const initialState: PaymentState = {
  value: false,
};

// Create the slice
const paymentSlice = createSlice({
  name: 'payment', // Updated name to 'payment'
  initialState,
  reducers: {
    togglePayment: (state) => {
      state.value = !state.value;
    },
  },
});

// Export the action
export const { togglePayment } = paymentSlice.actions;

// Export the reducer
export default paymentSlice.reducer;