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
      counterSlice.caseReducers.recalculateTotalValue(state);
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
      }
      counterSlice.caseReducers.recalculateTotalValue(state);
    },
    updateProduct: (state, action) => {
      const { id, attProduct } = action.payload;

      const index = state.products.findIndex(
        (element) => element.id === id
      );

      if (index !== -1) {
        state.products[index] = attProduct;

        counterSlice.caseReducers.recalculateTotalValue(state);
      }
    },
    recalculateTotalValue: (state) => {
      if (state.products.length === 0) {
        state.total_value = 0;
      } else {
        state.total_value = state.products.reduce((total, product) => {
          return total + product.final_price * product.selectedQuantity;
        }, 0);
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
