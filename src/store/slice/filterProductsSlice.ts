import { createSlice } from "@reduxjs/toolkit"

const filterProductsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        filteredItems: []
    },
    reducers: {
        setProducts: (state, action) => {
      state.items = action.payload;
    //   state.filteredItems = action.payload;
    },
        filterProducts: (state, action) => {
           state.filteredItems = action.payload.category
        //    ? state.filteredItems.filter((item: any) => item.category === action.payload.category)
        //    : action.payload;
        //    console.log(state.filteredItems);
        }
    }
})

export default filterProductsSlice.reducer
export const { setProducts, filterProducts } = filterProductsSlice.actions