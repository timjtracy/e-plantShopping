import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity, decrementItem, selectTotalCost } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
	console.log("in CartItem.jsx, just at A");
	const cart = useSelector(state => state.cart.items);
	console.log("in CartItem.jsx, just at B");
	const dispatch = useDispatch();
	const totalCost = useSelector(selectTotalCost);
	

	// Calculate total amount for all products in the cart
	const calculateTotalAmount = () => {
		console.log("***********inside calculateTotalAmount in file CartItem.jsx");
		let totalAmount = 0;
		cart.forEach((item) => {
			console.log("---inloop, current item is "+item.name);
			let thisItemcost = parseFloat(item.cost.replace('$', ''));
			totalAmount += thisItemcost * item.quantity;
		})
		console.log("exiting calculateTotalAmount in file CartItem.jsx. returning totalAmount="+totalAmount);
		return totalAmount;
	};

	const handleContinueShopping = (e) => {
		console.log("inside handleContinueShopping in file CartItem.jsx");	
		console.log("---add code here");
		console.log("exiting calculateTotalAmount in file CartItem.jsx");	
		e.preventDefault();
		onContinueShopping(e);  // Call the function passed as a prop
		console.log('I am exiting handleContinueShopping in file ProductList.jsx');			
	};

	const handleIncrement = (item) => {
		console.log("inside handleIncrement in file CartItem.jsx, item=" + item.name);	
		console.log("---item.quantity=" + item.quantity);		
        if (item) {
			dispatch(addItem(item));
        }
		console.log("now exiting handleIncrement in file CartItem.jsx, item=" + item.name);			
	};

	const handleDecrement = (item) => {
		console.log("inside handleDecrement in file CartItem.jsx, item=" + item.name);	
		console.log("---item.quantity=" + item.quantity);			
		if (item ) {
			if (item.quantity  > 0) {
				dispatch(decrementItem(item));
			}
        }
		console.log("now exiting handleDecrement in file CartItem.jsx");	
	};

	const handleRemove = (item) => {
		console.log("inside handleRemove in file CartItem.jsx, item=" + item.name);	
		dispatch(removeItem(item));		
		console.log("now exiting handleRemove in file CartItem.jsx");
	};

	// Calculate total cost based on quantity for an item
	const calculateTotalCost = (item) => {
		let thisItemcost = parseFloat(item.cost.replace('$', ''));
		console.log("inside calculateTotalCost in file CartItem.jsx. Based on current qty of item=" + item.name);	
		console.log("item.quantity=" + item.quantity);	
		console.log("item.cost=" + thisItemcost);	
		
        let itemTotalCost = 0;
        itemTotalCost = thisItemcost * item.quantity;

		console.log("now exitingc alculateTotalCost, just calculated itemTotalCost=" + itemTotalCost);
		
		return itemTotalCost;
	};
	
	const handleCheckoutShopping = (e) => {
		alert('Functionality to be added for future reference');
	};	

	return (
		<div className="cart-container">
			<h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
			<div>
			
				{cart.map
					(item => 
						(
							<div className="cart-item" key={item.name}>
								<img className="cart-item-image" src={item.image} alt={item.name} />
								<div className="cart-item-details">
									<div className="cart-item-name">{item.name}</div>
									<div className="cart-item-cost">{item.cost}</div>
									<div className="cart-item-quantity">
										<button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
										<span className="cart-item-quantity-value">{item.quantity}</span>
										<button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
									</div>
									<div className="cart-item-total">Total this item: ${calculateTotalCost(item)}</div>
									<button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
								</div>
							</div>
						)
					)
				}
			</div>
			<div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
				<h2>Total Cost: ${calculateTotalAmount()}</h2>
			</div>
			<div className="continue_shopping_btn">
				<button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
				<br />
				<button className="get-started-button1"onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
			</div>
		</div>
	);
};

export default CartItem;
