import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const {payload: addedItem} = action;
      const existingItem = state.items.find((item) => item.name === addedItem.name);
      // if (!state.items.some((item) => item.name === addedItem.name)) {
      if (!existingItem) {
        state.items.push({...addedItem, quantity: 1});
      } else {
        existingItem.quantity ++; // If the item already exists, increment its quantity
      }
    },
    removeItem: (state, action) => {
      const {payload: index} = action;
      if (state.items[index]) {
        state.items.splice(index, 1); // Remove the item at the specified index from the items array
        // In redux We can directly mutate state (Not in React Hooks)
        // because of the use of Immer library under the hood, 
        // which allows us to write "mutating" logic that updates the state immutably.
        // state.items = state.items.filter((_,idx)=> idx != index)
        // state.items = state.items.filter(item => item.name !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const {payload: {index, quantity}} = action;
      if (state.items[index] && quantity > 0) {
        state.items[index].quantity = quantity; // Update the quantity of the item at the specified index
      } else if (state.items[index] && quantity === 0) {
        state.items.splice(index, 1); // Remove the item if quantity is set to 0
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
