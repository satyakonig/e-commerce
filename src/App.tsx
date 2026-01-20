import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { ProductGrid } from "./components/ProductGrid";
import { ProductDetail } from "./components/ProductDetail";
import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Admin } from "./components/Admin";
import { getProducts, saveOrUpdateProduct } from "./util/Api";

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

// const products: Product[] = [
//   {
//     id: 1,
//     name: "Premium Wireless Headphones",
//     price: 299.99,
//     category: "Audio",
//     image:
//       "https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2ODExMjYxNnww&ixlib=rb-4.1.0&q=80&w=1080",
//     description:
//       "High-quality wireless headphones with active noise cancellation, premium sound quality, and up to 30 hours of battery life. Perfect for music lovers and professionals.",
//     rating: 4.8,
//     stock: 45,
//   },
//   {
//     id: 2,
//     name: "Mechanical Keyboard Pro",
//     price: 149.99,
//     category: "Accessories",
//     image:
//       "https://images.unsplash.com/photo-1694405156884-dea1ffb40ede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGtleWJvYXJkfGVufDF8fHx8MTc2ODE4ODI1OXww&ixlib=rb-4.1.0&q=80&w=1080",
//     description:
//       "Professional mechanical keyboard with RGB backlighting, customizable keys, and ergonomic design. Cherry MX switches for the best typing experience.",
//     rating: 4.6,
//     stock: 32,
//   },
//   {
//     id: 3,
//     name: "Smart Fitness Watch",
//     price: 399.99,
//     category: "Wearables",
//     image:
//       "https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjgxOTAxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     description:
//       "Advanced smartwatch with heart rate monitoring, GPS tracking, sleep analysis, and water resistance up to 50m. Compatible with iOS and Android.",
//     rating: 4.7,
//     stock: 28,
//   },
//   {
//     id: 4,
//     name: "UltraBook Pro 15",
//     price: 1299.99,
//     category: "Computers",
//     image:
//       "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjgxNjY3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     description:
//       "Powerful 15-inch laptop with Intel i7 processor, 16GB RAM, 512GB SSD, and stunning 4K display. Perfect for professionals and content creators.",
//     rating: 4.9,
//     stock: 15,
//   },
//   {
//     id: 5,
//     name: "Smartphone X Pro",
//     price: 899.99,
//     category: "Mobile",
//     image:
//       "https://images.unsplash.com/photo-1732998360037-4857039d77a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc2ODE5NTE5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
//     description:
//       "Latest flagship smartphone with 6.7-inch OLED display, triple camera system, 5G connectivity, and all-day battery life.",
//     rating: 4.8,
//     stock: 52,
//   },
//   {
//     id: 6,
//     name: "Professional DSLR Camera",
//     price: 1599.99,
//     category: "Cameras",
//     image:
//       "https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjgxMzAwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     description:
//       "Professional-grade DSLR camera with 24MP sensor, 4K video recording, advanced autofocus system, and weather-sealed body.",
//     rating: 4.9,
//     stock: 18,
//   },
//   {
//     id: 7,
//     name: "Tablet Ultra 12",
//     price: 799.99,
//     category: "Tablets",
//     image:
//       "https://images.unsplash.com/photo-1760708369071-e8a50a8979cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2V8ZW58MXx8fHwxNzY4MTA0NzU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
//     description:
//       "Premium 12-inch tablet with stunning display, powerful processor, and stylus support. Perfect for creative work and entertainment.",
//     rating: 4.7,
//     stock: 24,
//   },
//   {
//     id: 8,
//     name: "Gaming Mouse Elite",
//     price: 89.99,
//     category: "Accessories",
//     image:
//       "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjgxOTM1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     description:
//       "High-precision gaming mouse with customizable RGB lighting, programmable buttons, and ergonomic design for extended gaming sessions.",
//     rating: 4.5,
//     stock: 67,
//   },
// ];

type ViewType =
  | "products"
  | "detail"
  | "cart"
  | "checkout"
  | "about"
  | "contact"
  | "admin";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getProducts().then((res) => {
      setProductList(res);
    });
  };

  const saveProduct = (body: {}) => {
    saveOrUpdateProduct(body).then((res: PostApiResponse) => {
      console.log("res:", res);
      if (res?.success) {
        fetchProducts();
      }
    });
  };

  const categories = [
    "All",
    ...Array.from(new Set(productList.map((p) => p.category))),
  ];

  // Admin functions
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      id: Math.max(...productList.map((p) => p.id), 0) + 1,
      ...product,
    };
    let body = {
      apiKey: "e-com-test",
      action: "ADD",
      data: { ...newProduct },
    };
    saveProduct(body);
  };

  const updateProduct = (id: number, updatedProduct: Omit<Product, "id">) => {
    let body = {
      apiKey: "e-com-test",
      action: "UPDATE",
      data: { id: id, ...updatedProduct },
    };
    saveProduct(body);
  };

  const deleteProduct = (id: number) => {
    let body = {
      apiKey: "e-com-test",
      action: "DELETE",
      id: id,
    };
    saveProduct(body);
  };

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
    alert(
      `Thank you for your order, ${formData.name}! Your order has been placed successfully.`,
    );
    setCart([]);
    setCurrentView("products");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={() => setCurrentView("cart")}
        onLogoClick={() => setCurrentView("products")}
        onAboutClick={() => setCurrentView("about")}
        onContactClick={() => setCurrentView("contact")}
        onAdminClick={() => setCurrentView("admin")}
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

        {currentView === "admin" && (
          <Admin
            products={productList}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            onBack={() => setCurrentView("products")}
          />
        )}
      </main>
    </div>
  );
}
