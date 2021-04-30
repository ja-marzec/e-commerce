import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      value: 0,
      shopItems: [],
      cartItems: [],
      itemPreview: {
        open: false,
        product: {}
      } 
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
    },
      openPreview: (state, action) => {
        state.itemPreview.open = action.payload.open
        state.itemPreview.product = action.payload.product
    }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { increment, decrement, incrementByAmount, loadShopItems, loadCartItems, openPreview} = counterSlice.actions
  
  export default counterSlice.reducer