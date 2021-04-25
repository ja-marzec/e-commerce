import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      value: 0,
      shopItems: [],
      cartItems: []
    },
    reducers: {
      increment: (state) => {
        state.value += 1
      },
      decrement: (state) => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      },
      loadShopItems: (state, action) => {
          state.shopItems = action.payload
      },
      loadCartItems: (state, action) => {
        state.cartItems = action.payload
    }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { increment, decrement, incrementByAmount, loadShopItems, loadCartItems} = counterSlice.actions
  
  export default counterSlice.reducer