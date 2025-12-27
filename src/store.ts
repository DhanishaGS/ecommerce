
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import filterProductsReducer from './filterProductsSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filterProducts: filterProductsReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {    cart: cartState,  }
export type AppDispatch = typeof store.dispatch