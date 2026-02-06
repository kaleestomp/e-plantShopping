import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const totalAmount = cart.reduce((total, item) => {
      total += parseFloat(item.cost.substring(1)) * item.quantity; // Assuming item.cost is the price of a single unit
      return total; // Has to explicitly return { }
      // Otherwise, it will return undefined
    }, 0);
    console.log(cart);
    return totalAmount;
  };

  const handleContinueShopping = (e) => {
    // e.preventDefault();
    onContinueShopping(e); 
    // Call the onContinueShopping function passed as a prop to navigate back to the product list
  };
  
  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Checkout functionality is not implemented yet.'); // Placeholder for checkout functionality
  };

  const handleIncrement = (index) => {
    const newQuantiy = cart[index].quantity + 1;
    dispatch(updateQuantity({index: index, quantity: newQuantiy})); // Dispatch the updateQuantity action to increment the quantity of the item in the cart
  };

  const handleDecrement = (index) => {
    if (cart[index].quantity > 1) {
      const newQuantiy = cart[index].quantity - 1;
      dispatch(updateQuantity({index: index, quantity: newQuantiy})); // Dispatch the updateQuantity action to decrement the quantity of the item in the cart
    } else {
      dispatch(removeItem(index)); // If the quantity is 1, remove the item from the cart
    }
  };

  const handleRemove = (index) => {
    dispatch(removeItem(index)); // Dispatch the removeItem action to remove the item from the cart
    // if (cart.length === 1) onContinueShopping(); 
    // If the cart is empty after removing the item, navigate back to the product list
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (index) => {
    const itemTotalCost = parseFloat(cart[index].cost.replace('$', '')) * cart[index].quantity; // Assuming item.cost is the price of a single unit
    return itemTotalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item, index) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(index)}
                >-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(index)}
                >+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(index)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckout(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


