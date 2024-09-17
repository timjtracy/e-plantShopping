import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
		name: 'cart',
		initialState: {
			items: [], // Initialize items as an empty array
			cartTotalItems: 0,
		},
		reducers: {
			addItem: (state, action) => {
				const item = action.payload;
				const existingItem = state.items.find(i => i.name === item.name);;
				state.cartTotalItems += 1;
				console.log('I am in addItem reducer inside file CartSlice.jsx');
				if (existingItem) {
					console.log("---found an existing item ");	
					existingItem.quantity += 1;
					console.log("---current qty of this item is " + existingItem.quantity);					
				} else {
					console.log("---this is a new item in the cart ");
					state.items.push({ ...item, quantity: 1 });
					console.log("---current qty of this item is 1");						
				}

				console.log('I am now exiting addItem reducer inside file CartSlice.jsx');				
			},
			decrementItem: (state, action) => {
				const item = action.payload;
				const existingItem = state.items.find(i => i.name === item.name);;
				console.log('I am in decrementItem reducer inside file CartSlice.jsx');
				if (existingItem) {
					console.log("---found an existing item ");	
					existingItem.quantity -= 1;
					state.cartTotalItems -= 1;
					console.log("---current qty of this item is " + existingItem.quantity);					
				}

				console.log('I am now exiting decrementItem reducer inside file CartSlice.jsx');				
			},			
			removeItem: (state, action) => {
				const item = action.payload;
				const index = state.items.findIndex(i => i.name === item.name);		
				state.cartTotalItems -= item.quantity;
				console.log('I am in removeItem reducer inside file CartSlics.jsx, itemto remove is ' +item.name+', index='+index);
				console.log('---action.payload.name='+ action.payload.name);
				if (index !== -1) {
					state.items.splice(index, 1);
				}
				console.log('I am now exiting removeItem reducer inside file CartSlice.jsx');					

			},
			updateQuantity: (state, action) => {
				const { thisname, thisquantity } = action.payload;
				const itemToUpdate = state.items.find(item => item.name === thisname);
				console.log('I am in updateQuantity reducer inside file CartSlice.jsx');
				console.log('---thisname='+ thisname);
				if (itemToUpdate) {
					itemToUpdate.quantity = thisquantity;
					
					console.log('---found the item, so updating quantity to'+thisquantity);
				}
				console.log('I am now exiting updateQuantity reducer inside file CartSlice.jsx');					

			},
		},
	}
);

// Selector to calculate the total cost
export const selectTotalCost = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + (item.cost * item.quantity);
  }, 0);
};

export const { addItem, removeItem, updateQuantity, decrementItem } = CartSlice.actions;

export default CartSlice.reducer;
