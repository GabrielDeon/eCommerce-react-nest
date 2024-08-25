import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total_value: 0,
  products: [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productVariation = action.payload; 
      state.products.push(productVariation);
      state.total_value +=
        productVariation.final_price * productVariation.selectedQuantity;
    },
    removeProduct: (state, action) => {
      const productVariationID = action.payload; 
      const product = state.products.find(
        (element) => element.id === productVariationID
      );
      if (product) {
        state.products = state.products.filter(
          (item) => item.id !== productVariationID
        );
        state.total_value -=
          product.selectedQuantity * product.final_price;
      }
      if(state.products.length === 0) {
        state.total_value = 0;
      }
    },
  },
});

export const { addProduct, removeProduct } = counterSlice.actions;

export default counterSlice.reducer;
