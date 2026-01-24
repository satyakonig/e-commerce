import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { ProductGrid } from "./components/ProductGrid";
import { ProductDetail } from "./components/ProductDetail";
import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { getProducts } from "./util/Api";
import { Toaster } from "sonner";
import { toast } from "sonner";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PostApiResponse {
  success: boolean;
}

type ViewType =
  | "products"
  | "detail"
  | "cart"
  | "checkout"
  | "about"
  | "contact";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetchProducts();
        setProductList(res);
      } catch {
        toast.error("Something went wrong!");
        setProductList([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      return res;
    } catch (err) {
      throw err; // important
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(productList.map((p) => p.category))),
  ];

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView("detail");
  };

  const handleCheckout = (formData: any) => {
    console.log("Order submitted:", {
      formData,
      cart,
      total: getTotalPrice(),
    });
    const phone = "919963877600";
    const productsList = cart?.map(
      (c, index) => `${index + 1})${c.name}-${c.quantity} `,
    );
    const message = `Hi, I want to buy these Products:
    ${productsList}
    Name: ${formData?.name},
    MobileNo: ${formData?.phone},
    Address : ${formData?.address}, ${formData?.city}, ${formData?.state},${formData?.zipCode} 
    `;

    const mobileUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    const webUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = mobileUrl;
    } else {
      window.open(webUrl, "_blank");
    }
    setCart([]);
    setCurrentView("products");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={() => setCurrentView("cart")}
        onLogoClick={() => setCurrentView("products")}
        onAboutClick={() => setCurrentView("about")}
        onContactClick={() => setCurrentView("contact")}
        currentView={currentView}
      />

      <main className="pt-16">
        {currentView === "products" && (
          <ProductGrid
            cartItems={cart}
            products={productList}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onProductClick={handleProductClick}
            onAddToCart={addToCart}
            onUpdateQuantity={updateCartItemQuantity}
            isLoading={isLoading}
          />
        )}

        {currentView === "detail" && selectedProduct && (
          <ProductDetail
            cartItems={cart}
            product={selectedProduct}
            onBack={() => setCurrentView("products")}
            onAddToCart={addToCart}
            onUpdateQuantity={updateCartItemQuantity}
          />
        )}

        {currentView === "cart" && (
          <Cart
            items={cart}
            onUpdateQuantity={updateCartItemQuantity}
            onRemoveItem={removeFromCart}
            onContinueShopping={() => setCurrentView("products")}
            onCheckout={() => setCurrentView("checkout")}
            totalPrice={getTotalPrice()}
          />
        )}

        {currentView === "checkout" && (
          <Checkout
            cart={cart}
            totalPrice={getTotalPrice()}
            onBack={() => setCurrentView("cart")}
            onSubmit={handleCheckout}
          />
        )}

        {currentView === "about" && (
          <About onBack={() => setCurrentView("products")} />
        )}

        {currentView === "contact" && (
          <Contact onBack={() => setCurrentView("products")} />
        )}
      </main>
    </div>
  );
}
