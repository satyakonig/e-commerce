import { ShoppingCart, Store, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  currentView: string;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onAdminClick?: () => void;
}

export function Header({ cartItemCount, onCartClick, onLogoClick, currentView, onAboutClick, onContactClick, onAdminClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (callback?: () => void) => {
    if (callback) callback();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Store className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">TechStore</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onLogoClick}
              className={`transition-colors ${
                currentView === 'products' || currentView === 'detail'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Products
            </button>
            <button
              onClick={onAboutClick}
              className={`transition-colors ${
                currentView === 'about'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </button>
            <button
              onClick={onContactClick}
              className={`transition-colors ${
                currentView === 'contact'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact
            </button>
            <button
              onClick={onAdminClick}
              className={`transition-colors ${
                currentView === 'admin'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Admin
            </button>
          </nav>

          {/* Mobile Menu Button & Cart */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick(onLogoClick)}
                className={`text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'products' || currentView === 'detail'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => handleNavClick(onAboutClick)}
                className={`text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'about'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavClick(onContactClick)}
                className={`text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'contact'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => handleNavClick(onAdminClick)}
                className={`text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'admin'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Admin
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}