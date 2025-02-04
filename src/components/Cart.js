
import React from 'react';
import { useCart } from '../contexts/cartcontext';
import { TrashIcon } from '@heroicons/react/24/solid';

const Cart = () => {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2 border-b pb-2">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <span className="mr-4">Total: ${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 font-bold text-xl">
            Total: ${getTotalPrice().toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;