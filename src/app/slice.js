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
      },
      checkout: {
        checkoutToken: {},
        // Customer details
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@email.com',
        // Shipping details
        shippingName: 'Jane Doe',
        shippingStreet: '123 Fake St',
        shippingCity: 'San Francisco',
        shippingStateProvince: 'CA',
        shippingPostalZipCode: '94107',
        shippingCountry: 'US',
        // Payment details
        cardNum: '4242 4242 4242 4242',
        expMonth: '11',
        expYear: '2023',
        ccv: '123',
        billingPostalZipcode: '94107',
        // Shipping and fulfillment data
        shippingCountries: {},
        shippingSubdivisions: {},
        shippingOptions: [],
        shippingOption: '',
      },
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
    },
      setCheckout: (state, action) => {
        state.checkout.checkoutToken = action.payload
      },
      setCheckoutInfo: (state, action) => {
        state.checkout[action.payload.keyName] = action.payload.value;
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { increment, decrement, incrementByAmount, loadShopItems, loadCartItems, openPreview, setCheckout, setCheckoutInfo} = counterSlice.actions
  
  export default counterSlice.reducer