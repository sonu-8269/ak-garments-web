import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, User, Sparkles } from 'lucide-react';
import { CartItem, Product } from '../types';

interface NavbarProps {
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: string) => void;
  onNavigateHome: () => void;
  onOpenTailoring: () => void;
  activeGender?: 'women' | 'men';
  onGenderChange?: (gender: 'women' | 'men') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  onNavigateHome,
  onOpenTailoring,
  activeGender = 'women',
  onGenderChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', action: onNavigateHome },
    {
      label: 'Men',
      action: () => onSelectCategory('men'),
      megaMenu: [
        'Tailored Suits & Blazers',
        'Egyptian Poplin Shirts',
        'Fine Gauge Knitwear',
        'Sartorial Trousers',
        'Casual Hoodies & Outerwear',
        'Italian Leather Loafers',
      ],
    },
    {
      label: 'Women',
      action: () => onSelectCategory('women'),
      megaMenu: [
        'Double-Breasted Linen Suits',
        'Fluid Silk Evening Gowns',
        'Architectural Co-ord Sets',
        'Bespoke Tailored Blazers',
        'Contemporary Trousers',
      ],
    },
    {
      label: 'Wedding & Royal',
      action: () => onSelectCategory('wedding'),
      badge: 'Heritage',
      megaMenu: [
        'Imperial Ivory Sherwanis',
        'Groom Safa & Turbans',
        'Black Tie Velvet Tuxedos',
        'Indo-Western Regalia',
        'Silk Kurta Ensembles',
      ],
    },
    {
      label: 'Custom Tailoring',
      action: onOpenTailoring,
      badge: 'Studio',
      highlight: true,
    },
    {
      label: 'Explore The Rack',
      action: () => {
        const rackElement = document.getElementById('clothing-rack-section');
        rackElement?.scrollIntoView({ behavior: 'smooth' });
      },
      badge: '3D Interactive',
    },
    {
      label: 'Lookbook',
      action: () => {
        const lookbookElement = document.getElementById('lookbook-section');
        lookbookElement?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#20201E] text-[#F7F3ED] text-xs py-2 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-sans">
          <div className="hidden sm:flex items-center gap-2 text-gold-champagne tracking-widest uppercase text-[10px]">
            <Sparkles className="w-3 h-3 text-[#B89562]" />
            <span>Autumn / Winter Sartorial Edition</span>
          </div>
          <div className="w-full sm:w-auto text-center font-normal tracking-wider text-[11px]">
            Complimentary Master Tailor Consultations · Express Worldwide Delivery · 30-Day Alterations
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#DFD7CB]">
            <button onClick={onOpenTailoring} className="hover:text-white transition-colors underline decoration-[#B89562]">
              Book Fitting
            </button>
            <span className="text-zinc-600">|</span>
            <span>EN / INR (₹)</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F3ED]/95 backdrop-blur-md shadow-sm border-b border-[#DFD7CB]/60 py-3.5'
            : 'bg-[#F7F3ED] border-b border-[#DFD7CB]/30 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile hamburger & Secondary links */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 text-[#20201E] hover:text-[#B89562] transition-colors focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
              <button
                onClick={onOpenSearch}
                className="p-1.5 text-[#20201E] hover:text-[#B89562] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Brand Logo - Letter-spaced serif AK GARMENTS wordmark on the left */}
            <div className="flex items-center">
              <button
                onClick={onNavigateHome}
                className="text-left group flex flex-col items-start"
              >
                <div className="flex items-center gap-2">
                  <span className="font-instrument text-2xl sm:text-3xl tracking-[0.22em] font-normal text-[#151412] uppercase group-hover:opacity-80 transition-opacity">
                    AK GARMENTS
                  </span>
                  <span className="text-[10px] font-manrope font-semibold tracking-widest text-[#77736c] hidden sm:inline">
                    · NEW YORK
                  </span>
                </div>
                <span className="text-[8px] tracking-[0.28em] uppercase text-[#77736c] font-manrope -mt-1 font-light">
                  Fall '26 Runway & Bespoke Collection
                </span>
              </button>
            </div>

            {/* Center: Women / Men Tabs with growing center underline + Essential Categories */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Women / Men Runway Quick Switch */}
              <div className="inline-flex items-center gap-5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#e3e0da] shadow-xs">
                <button
                  onClick={() => {
                    onGenderChange?.('women');
                    const el = document.getElementById('runway-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative pb-0.5 text-xs font-manrope font-semibold tracking-wider uppercase transition-colors ${
                    activeGender === 'women' ? 'text-[#151412]' : 'text-[#77736c] hover:text-[#151412]'
                  }`}
                >
                  Women
                  {activeGender === 'women' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#151412] rounded-full animate-fade-in" />
                  )}
                </button>
                <span className="text-[#e3e0da] text-xs">/</span>
                <button
                  onClick={() => {
                    onGenderChange?.('men');
                    const el = document.getElementById('runway-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative pb-0.5 text-xs font-manrope font-semibold tracking-wider uppercase transition-colors ${
                    activeGender === 'men' ? 'text-[#151412]' : 'text-[#77736c] hover:text-[#151412]'
                  }`}
                >
                  Men
                  {activeGender === 'men' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#151412] rounded-full animate-fade-in" />
                  )}
                </button>
              </div>

              {/* Navigation Links */}
              <button
                onClick={() => {
                  const el = document.getElementById('deconstruct-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-[0.14em] font-manrope font-medium text-[#151412] hover:text-[#77736c] transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#b89562] animate-pulse" />
                <span>3D Anatomy</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('clothing-rack-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-[0.14em] font-manrope font-medium text-[#151412] hover:text-[#77736c] transition-colors"
              >
                The Rack
              </button>

              <button
                onClick={onOpenTailoring}
                className="text-xs uppercase tracking-[0.14em] font-manrope font-medium text-[#151412] hover:text-[#77736c] transition-colors"
              >
                Bespoke Tailoring
              </button>

              <button
                onClick={() => onSelectCategory('wedding')}
                className="text-xs uppercase tracking-[0.14em] font-manrope font-medium text-[#151412] hover:text-[#77736c] transition-colors"
              >
                Royal Wedding
              </button>
            </nav>

            {/* Right: Search, Account, Wishlist, Bag with spring count badge */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-full hover:bg-white text-[#151412] transition-colors"
                aria-label="Search"
                title="Search Collection"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Account / User Icon */}
              <button
                onClick={onOpenTailoring}
                className="hidden sm:flex p-2 rounded-full hover:bg-white text-[#151412] transition-colors"
                aria-label="Account & Fittings"
                title="Account & Tailoring Appointments"
              >
                <User className="w-4 h-4" />
              </button>

              {/* Wishlist */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 rounded-full hover:bg-white text-[#151412] transition-colors"
                aria-label="Wishlist"
                title="Saved Items"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#151412] text-white text-[9px] font-bold flex items-center justify-center animate-fade-in shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag with Springy Scale Black Count Badge */}
              <button
                onClick={onOpenCart}
                className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e3e0da] hover:border-[#151412] text-[#151412] transition-all shadow-xs group"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 text-[#151412]" />
                <span className="hidden sm:inline text-xs font-manrope font-semibold">
                  Bag
                </span>
                <span className="w-5 h-5 rounded-full bg-[#151412] text-white text-[10px] font-manrope font-bold flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs">
                  {totalCartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F4] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#DFD7CB]">
                <div>
                  <span className="font-serif text-xl tracking-widest font-semibold text-[#20201E]">
                    AK GARMENTS
                  </span>
                  <span className="block text-[9px] tracking-widest uppercase text-zinc-500 font-sans">
                    Luxury Garments
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-zinc-200/50 text-[#20201E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <button
                      onClick={() => {
                        link.action();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left font-serif text-lg text-[#20201E] hover:text-[#B89562] transition-colors flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B89562]/15 text-[#B89562] font-sans uppercase">
                          {link.badge}
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#DFD7CB] space-y-3">
              <button
                onClick={() => {
                  onOpenTailoring();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-[#31443A] text-white text-xs uppercase tracking-widest font-medium rounded-sm text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B89562]" />
                <span>Custom Tailoring Studio</span>
              </button>
              <div className="text-center text-xs text-[#7A7771]">
                Need assistance? Call AK Garments Concierge
                <div className="font-medium text-[#20201E] mt-0.5">+1 (800) 452-8354</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
