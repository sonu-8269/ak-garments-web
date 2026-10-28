import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/mockData';
import { Product, CartItem, RunwayLook, RunwayPiece } from './types';
import { Navbar } from './components/Navbar';
import { RunwayLineup } from './components/RunwayLineup';
import { RunwayProductModal } from './components/RunwayProductModal';
import { Circular3DDeconstruct } from './components/Circular3DDeconstruct';
import { HeroSection } from './components/HeroSection';
import { InfiniteClothingRack } from './components/InfiniteClothingRack';
import { Garment3DModal } from './components/Garment3DModal';
import { ShopByCategory } from './components/ShopByCategory';
import { TailoringStudio } from './components/TailoringStudio';
import { WeddingOccasion } from './components/WeddingOccasion';
import { TrendingProducts } from './components/TrendingProducts';
import { EditorialLookbook } from './components/EditorialLookbook';
import { CraftsmanshipStory } from './components/CraftsmanshipStory';
import { TrustBar } from './components/TrustBar';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

export const App: React.FC = () => {
  // Active Gender selection (Women / Men)
  const [activeGender, setActiveGender] = useState<'women' | 'men'>('women');

  // Selected Runway Look for dedicated look view
  const [selectedRunwayLook, setSelectedRunwayLook] = useState<RunwayLook | null>(null);

  // Toast confirmation state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart State (Persisted in LocalStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ak_garments_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'rack-1-L-Rosewood Dust',
          product: PRODUCTS[0],
          selectedSize: 'L',
          selectedColor: 'Rosewood Dust',
          quantity: 1,
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in LocalStorage)
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ak_garments_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[4]];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ak_garments_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ak_garments_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Modal Visibility States
  const [selectedProductFor3D, setSelectedProductFor3D] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [tailoringGarment, setTailoringGarment] = useState<Product | null>(null);

  // Cart Actions
  const handleAddToCart = (product: Product, size: string, color: string) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === itemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: itemId, product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
    showToast(`Added ${product.name} (${size}) to bag`);
  };

  // Add individual piece from Runway Lineup "In This Look" card (defaults to size M)
  const handleAddRunwayPieceToCart = (piece: RunwayPiece, look: RunwayLook) => {
    const mockProduct: Product = {
      id: piece.id,
      name: piece.name,
      subtitle: `${look.title} Ensemble`,
      category: look.gender,
      subCategory: piece.category,
      price: piece.price,
      image: piece.image,
      backImage: piece.image,
      colors: [{ name: piece.color, hex: '#151412' }],
      sizes: piece.sizes,
      fabric: look.fabricCare.split('.')[0],
      description: look.description,
      details: [look.fabricCare, look.sizeFit],
      inStock: true,
    };
    const defaultSize = piece.sizes.includes('M') ? 'M' : piece.sizes[0];
    handleAddToCart(mockProduct, defaultSize, piece.color);
  };

  // Add multiple pieces from Look Modal
  const handleAddRunwayBatchToCart = (items: { piece: RunwayPiece; size: string; color: string }[]) => {
    items.forEach(({ piece, size, color }) => {
      const mockProduct: Product = {
        id: piece.id,
        name: piece.name,
        subtitle: `Fall '26 Runway Edition`,
        category: activeGender,
        subCategory: piece.category,
        price: piece.price,
        image: piece.image,
        backImage: piece.image,
        colors: [{ name: color, hex: '#151412' }],
        sizes: piece.sizes,
        fabric: 'Italian Virgin Wool & Mulberry Silk',
        description: 'Runway Lookbook Item',
        details: ['Complimentary alterations included'],
        inStock: true,
      };
      handleAddToCart(mockProduct, size, color);
    });
    setSelectedRunwayLook(null);
    setIsCartOpen(true);
    showToast(`Added ${items.length} pieces to bag`);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      }
      showToast(`Saved to wishlist`);
      return [...prev, product];
    });
  };

  const handleToggleWishlistById = (productId: string) => {
    const existing = PRODUCTS.find((p) => p.id === productId);
    if (existing) {
      handleToggleWishlist(existing);
    } else {
      // Mock minimal product for runway piece
      const mockP: Product = {
        id: productId,
        name: 'Runway Exclusive Piece',
        subtitle: 'Fall 2026 Collection',
        category: activeGender,
        subCategory: 'Runway',
        price: 380,
        image: '/images/runway-women-1.jpg',
        backImage: '/images/runway-women-1.jpg',
        colors: [{ name: 'Studio', hex: '#151412' }],
        sizes: ['S', 'M', 'L'],
        fabric: 'Virgin Wool',
        description: 'Runway garment',
        details: [],
        inStock: true,
      };
      handleToggleWishlist(mockP);
    }
  };

  // Navigation handlers
  const handleNavigateHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTailoring = () => {
    const tailoringElement = document.getElementById('custom-tailoring-section');
    tailoringElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenTailoringForGarment = (product: Product) => {
    setTailoringGarment(product);
    handleOpenTailoring();
  };

  const handleSelectCategory = (categoryId: string) => {
    if (categoryId === 'tailoring') {
      handleOpenTailoring();
      return;
    }
    if (categoryId === 'women') {
      setActiveGender('women');
      const el = document.getElementById('runway-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (categoryId === 'men') {
      setActiveGender('men');
      const el = document.getElementById('runway-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const trendingElement = document.getElementById('trending-section');
    trendingElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreRack = () => {
    const rackElement = document.getElementById('clothing-rack-section');
    rackElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const weddingProducts = PRODUCTS.filter((p) => p.category === 'wedding' || p.category === 'ethnic');

  return (
    <div className="min-h-screen bg-[#f4f3f0] text-[#151412] font-manrope">
      
      {/* Toast Notification Pill in top-right */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-fade-in pointer-events-none">
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#151412] text-white text-xs font-manrope font-semibold shadow-2xl border border-white/10">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Header */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
        onNavigateHome={handleNavigateHome}
        onOpenTailoring={handleOpenTailoring}
        activeGender={activeGender}
        onGenderChange={(g) => setActiveGender(g)}
      />

      {/* Main Flow */}
      <main>
        
        {/* 1. HERO: THE RUNWAY LINEUP (6 Models Depth Queue, 360 Turn, In This Look) */}
        <div id="runway-section">
          <RunwayLineup
            activeGender={activeGender}
            onGenderChange={setActiveGender}
            onOpenLook={(look) => setSelectedRunwayLook(look)}
            onAddToCart={handleAddRunwayPieceToCart}
            onToggleWishlist={handleToggleWishlistById}
            wishlistIds={wishlist.map((p) => p.id)}
          />
        </div>

        {/* 2. THE 360° INTERACTIVE OUTFIT STUDIO */}
        <div id="deconstruct-section">
          <Circular3DDeconstruct
            onAddToCart={handleAddToCart}
            onOpenTailoring={handleOpenTailoring}
            onSelectProductFor3D={(p) => setSelectedProductFor3D(p)}
            activeGender={activeGender}
          />
        </div>

        {/* 3. THE SIGNATURE: Infinite 3D Animated Clothing Rail */}
        <div id="clothing-rack-section">
          <InfiniteClothingRack
            products={PRODUCTS}
            onSelectProduct={(product) => setSelectedProductFor3D(product)}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* 4. Editorial Campaign Banner & Categories */}
        <HeroSection
          onExploreCollection={() => {
            const el = document.getElementById('trending-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenTailoring={handleOpenTailoring}
          onExploreRack={handleExploreRack}
        />

        {/* 5. Shop by Category */}
        <ShopByCategory
          onSelectCategory={handleSelectCategory}
          onOpenTailoring={handleOpenTailoring}
        />

        {/* 6. Interactive Bespoke Tailoring Studio ("Made For You") */}
        <TailoringStudio
          initialProduct={tailoringGarment}
          onClose={() => setTailoringGarment(null)}
        />

        {/* 7. Royal Wedding & Matrimonial Edit */}
        <WeddingOccasion
          weddingProducts={weddingProducts}
          onSelectProduct={(product) => setSelectedProductFor3D(product)}
          onOpenTailoring={handleOpenTailoring}
        />

        {/* 8. "Every Piece" Catalog Grid & Filtering */}
        <div id="trending-section">
          <TrendingProducts
            products={PRODUCTS}
            onSelectProduct={(product) => setSelectedProductFor3D(product)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map((p) => p.id)}
          />
        </div>

        {/* 9. Campaign Editorial Lookbook with Hotspots */}
        <EditorialLookbook
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProductFor3D(product)}
        />

        {/* 10. Artisanal Heritage & Floating Canvas Craftsmanship */}
        <CraftsmanshipStory
          onOpenTailoring={handleOpenTailoring}
        />

        {/* 11. Trust & Service Bar with Testimonials */}
        <TrustBar />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenTailoring={handleOpenTailoring}
        onSelectCategory={handleSelectCategory}
      />

      {/* Runway Look Dedicated Product Modal (360 view, sizes, store reservation) */}
      <RunwayProductModal
        look={selectedRunwayLook}
        isOpen={Boolean(selectedRunwayLook)}
        onClose={() => setSelectedRunwayLook(null)}
        onAddToCartBatch={handleAddRunwayBatchToCart}
        onToggleWishlist={handleToggleWishlistById}
        wishlistIds={wishlist.map((p) => p.id)}
        onSelectAnotherLook={(look) => setSelectedRunwayLook(look)}
      />

      {/* 3D Garment Studio Inspector Modal (For rack garments) */}
      <Garment3DModal
        product={selectedProductFor3D}
        isOpen={Boolean(selectedProductFor3D)}
        onClose={() => setSelectedProductFor3D(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={Boolean(selectedProductFor3D && wishlist.some((p) => p.id === selectedProductFor3D.id))}
        onOpenTailoringForGarment={handleOpenTailoringForGarment}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => setSelectedProductFor3D(product)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
      />

    </div>
  );
};

export default App;
