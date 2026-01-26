import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import type { CartItem, Product } from "../App";
import { getDriveImageUrl } from "../common/utils";

interface ProductCardProps {
  cartItems: CartItem[];
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export function ProductCard({
  cartItems,
  product,
  onClick,
  onAddToCart,
  onUpdateQuantity,
}: ProductCardProps) {
  const cartItem = cartItems?.find((cItem) => cItem?.id === product?.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
      <div
        onClick={onClick}
        className="relative aspect-square overflow-hidden bg-gray-100"
      >
        <img
          src={getDriveImageUrl(product.image)}
          alt={product?.name}
          referrerPolicy="no-referrer"
        />

        {product.stock < 20 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Low Stock
          </div>
        )}
        {product.stock <= 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-blue-600 font-medium">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <span className="text-sm text-gray-500">
            ({product.stock} in stock)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </span>
          {cartItem?.quantity ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onUpdateQuantity(cartItem.id, cartItem.quantity - 1);
                }}
                // disabled={product.quantity <= 1}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {cartItem?.quantity}
              </span>
              <button
                onClick={() => {
                  onUpdateQuantity(cartItem.id, cartItem.quantity + 1);
                }}
                disabled={cartItem.quantity >= cartItem.stock}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Add to cart"
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
