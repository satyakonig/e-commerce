import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import type { CartItem } from "../App";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
  totalPrice: number;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onCheckout,
  totalPrice,
}: CartProps) {
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <button
            onClick={onContinueShopping}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
            >
              {/* Product Image */}
              <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      ₹{item.price.toFixed(2)} each
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{totalPrice > 100 ? "FREE" : "₹50"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (estimated)</span>
                <span>₹{(totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>
                ₹
                {(
                  totalPrice +
                  (totalPrice > 100 ? 0 : 9.99) +
                  totalPrice * 0.08
                ).toFixed(2)}
              </span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-3"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={onContinueShopping}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>

            {totalPrice < 100 && (
              <p className="text-sm text-gray-500 text-center mt-4">
                Add ₹{(100 - totalPrice).toFixed(2)} more for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
