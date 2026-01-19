import { ArrowLeft, Award, Users, Target, Heart } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export function About({ onBack }: AboutProps) {
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

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">About TechStore</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your trusted destination for premium tech products and exceptional customer service
          </p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Our Story */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2020, TechStore began with a simple mission: to make cutting-edge technology 
              accessible to everyone. What started as a small online shop has grown into a trusted 
              destination for tech enthusiasts and professionals alike.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We carefully curate our product selection to ensure that every item meets our high 
              standards for quality, innovation, and value. From the latest gadgets to essential 
              accessories, we're committed to bringing you the best technology has to offer.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-sm text-gray-600">
                Every product is tested and verified to meet our high standards
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Focus</h3>
              <p className="text-sm text-gray-600">
                Your satisfaction is our top priority, always
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">
                We stay ahead with the latest tech trends and products
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Passion</h3>
              <p className="text-sm text-gray-600">
                We love technology and it shows in everything we do
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Products Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">4.8/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
