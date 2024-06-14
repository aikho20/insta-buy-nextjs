import { createSlice } from '@reduxjs/toolkit'

const storeReducer = createSlice({
  name: 'account',
  initialState: {
    cart: [] || {},
  },
  reducers: {
    addItemCart: (state, action) => {
      state.cart = action.payload
    },
    decrementItemCart: (state, action) => {
      state.cart = action.payload
    },
    incrementItemCart: (state, action) => {
      state.cart = action.payload
    },
    removeItemCart: (state, action) => {
      state.cart = action.payload
    },
  },
})

export const { incrementItemCart, decrementItemCart, removeItemCart, addItemCart } =
  storeReducer.actions

export default storeReducer.reducer
