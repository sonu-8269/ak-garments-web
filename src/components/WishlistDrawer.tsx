import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-[#20201E]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF8F4] shadow-2xl flex flex-col z-10 animate-fade-in border-l border-[#DFD7CB]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#DFD7CB] bg-[#F7F3ED] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#B89562] fill-[#B89562]" />
            <h3 className="font-serif text-xl font-medium text-[#20201E]">
              Your Wishlist ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#E8DED1] text-[#20201E] transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
              <div className="w-16 h-16 rounded-full bg-[#E8DED1] flex items-center justify-center text-[#7A7771]">
                <Heart className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="font-serif text-xl text-[#20201E]">Your Wishlist is Empty</div>
              <p className="text-xs text-[#7A7771] max-w-xs font-light">
                Save pieces from our collections or 3D clothing rack for personal consideration.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm flex gap-3.5 items-center justify-between"
              >
                <div className="w-16 h-20 bg-[#E8DED1] rounded-sm overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h4 className="font-serif text-sm font-medium text-[#20201E] line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="text-xs font-semibold text-[#20201E]">
                    ${product.price}
                  </div>
                  <div className="text-[10px] text-[#7A7771]">
                    {product.fabric.split(',')[0]}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard');
                      onRemoveFromWishlist(product);
                    }}
                    className="px-3 py-1.5 bg-[#20201E] text-white text-[10px] uppercase tracking-wider rounded-sm hover:bg-[#31443A] flex items-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3 text-[#B89562]" />
                    <span>Move to Bag</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="text-[11px] text-[#7A7771] hover:text-rose-700 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
