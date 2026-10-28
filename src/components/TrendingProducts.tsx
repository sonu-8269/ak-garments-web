import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface TrendingProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const tabs = [
    { id: 'all', label: 'All Creations' },
    { id: 'men', label: 'Menswear' },
    { id: 'women', label: 'Womenswear' },
    { id: 'wedding', label: 'Wedding & Royal' },
    { id: 'tailoring', label: 'Bespoke Tailoring' },
  ];

  let filtered = activeTab === 'all' ? products : products.filter((p) => p.category === activeTab);

  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0]?.name || 'Standard';
    onAddToCart(product, defaultSize, defaultColor);

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <section id="trending-section" className="bg-[#FAF8F4] py-16 sm:py-24 border-b border-[#DFD7CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#B89562] font-semibold font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sartorial Excellence</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#20201E]">
              Trending & New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-[#52504C] font-light max-w-lg">
              Explore considered garments tailored with generational expertise, noble fibres, and flawless draping.
            </p>
          </div>

          {/* Sort By Filter */}
          <div className="flex items-center gap-2 text-xs font-sans self-start md:self-auto">
            <span className="text-[#7A7771]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm p-2 text-[#20201E] focus:outline-none focus:border-[#B89562]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-[#DFD7CB]/60">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs tracking-wider uppercase font-sans whitespace-nowrap rounded-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-[#20201E] text-white font-medium shadow-sm'
                  : 'bg-[#F7F3ED] text-[#52504C] hover:text-[#20201E] hover:bg-[#E8DED1]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid (Inspired by Brunello Cucinelli / Modeza) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isJustAdded = addedProductId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm overflow-hidden shadow-sm hover:shadow-luxury hover:border-[#B89562] transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Product Imagery Stage */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E8DED1]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Badge */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-[#20201E]/90 text-white text-[9px] font-sans font-medium uppercase tracking-wider">
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
                      isWishlisted
                        ? 'bg-white text-[#B89562]'
                        : 'bg-white/80 hover:bg-white text-[#52504C] hover:text-[#20201E]'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#B89562]' : ''}`} />
                  </button>

                  {/* Quick Action Floating Bar on Hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="flex-1 py-2 px-3 bg-[#20201E]/95 hover:bg-[#31443A] text-white text-[11px] font-sans uppercase tracking-wider rounded-sm backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors shadow-md"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#B89562]" />
                          <span>Quick Add</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="p-2 bg-white/95 hover:bg-white text-[#20201E] rounded-sm backdrop-blur-sm shadow-md transition-colors"
                      title="Inspect in 3D"
                    >
                      <Eye className="w-4 h-4 text-[#B89562]" />
                    </button>
                  </div>
                </div>

                {/* Product Information */}
                <div className="p-4 bg-[#FAF8F4] border-t border-[#DFD7CB]/60 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-[#7A7771] uppercase tracking-wider font-sans">
                    <span>{product.subCategory}</span>
                    {product.rating && (
                      <span className="text-[#B89562] font-serif font-bold">
                        ★ {product.rating}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#20201E] group-hover:text-[#B89562] transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline justify-between pt-1 border-t border-[#DFD7CB]/40">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-sm font-semibold text-[#20201E]">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-sans text-xs text-zinc-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1">
                      {product.colors.slice(0, 3).map((c, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
