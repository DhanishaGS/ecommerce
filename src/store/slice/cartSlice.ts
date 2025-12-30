import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Item } from "../../types/ItemInterface";

interface CartItem {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
  count?: number
}

export interface Rating {
  rate: number
  count: number
}


interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartItem>) => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
      items.push(action.payload);
      console.log(items);
      state.items = items.reduce((acc: CartItem[], item: CartItem) => {
        const existingItem = acc.find((i: CartItem) => i.id === item.id);
        if (existingItem) {
          existingItem.count = (existingItem.count || 0) + 1;
        } else {
          acc.push({ ...item, count: item.count || 1 });
        }
        return acc;
      }, [] as CartItem[]);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeCart: (state, action: PayloadAction<CartItem>) => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
      state.items = items.filter((item: Item) => item.id !== action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decrementQuantity: (state, action: PayloadAction<string | number>) => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");

      state.items = items.map((item:Item) =>
        item.id === action.payload
          ? { ...item, count: Math.max((item.count || 1) - 1, 1) }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    incrementQuantity: (state, action: PayloadAction<string | number>) => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");

      state.items = items.map((item: Item) =>
        item.id === action.payload
          ? { ...item, count: (item.count || 0) + 1 }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCart, removeCart, decrementQuantity, incrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
