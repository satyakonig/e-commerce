import { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Minus, Plus, Package, Truck, Shield } from 'lucide-react';
import type { Product } from '../App';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    alert(`Added ${quantity} item(s) to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-sm text-blue-600 font-medium">{product.category}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-gray-700">{product.rating}</span>
            <span className="text-gray-500">• {product.stock} in stock</span>
          </div>

          <div className="text-4xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg font-semibold mb-8"
          >
            <ShoppingCart className="w-6 h-6" />
            Add to Cart
          </button>

          {/* Features */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $100</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Package className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Warranty</h3>
                <p className="text-sm text-gray-600">1-year manufacturer warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
