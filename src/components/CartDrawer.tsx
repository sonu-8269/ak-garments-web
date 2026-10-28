import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingThreshold = 250;
  const isFreeShipping = subtotal >= shippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AK10' || promoCode.trim().toUpperCase() === 'AKVIP') {
      setDiscountPercent(10);
      setPromoMessage('10% Sartorial Courtesy Applied');
    } else {
      setPromoMessage('Invalid invitation code');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#20201E]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF8F4] shadow-2xl flex flex-col z-10 animate-fade-in border-l border-[#DFD7CB]">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#DFD7CB] bg-[#F7F3ED] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B89562]" />
            <h3 className="font-serif text-xl font-medium text-[#20201E]">
              Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#E8DED1] text-[#20201E] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Milestone Progress */}
        <div className="px-6 py-3 bg-[#E8DED1]/50 border-b border-[#DFD7CB] text-xs font-sans">
          {isFreeShipping ? (
            <div className="text-emerald-800 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Complimentary White-Glove Express Shipping Unlocked!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-[#52504C]">
                Add <strong className="text-[#20201E]">${shippingThreshold - subtotal}</strong> more for complimentary worldwide express delivery.
              </div>
              <div className="w-full bg-[#DFD7CB] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#B89562] h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
              <div className="w-16 h-16 rounded-full bg-[#E8DED1] flex items-center justify-center text-[#7A7771]">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="font-serif text-xl text-[#20201E]">Your Bag is Empty</div>
              <p className="text-xs text-[#7A7771] max-w-xs font-light">
                Explore our 3D clothing rail or curated collections to commission your next signature look.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#20201E] text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#31443A] transition-colors"
              >
                Discover Garments
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm flex gap-3.5 relative group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-[#E8DED1] rounded-sm overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1 pr-6">
                    <h4 className="font-serif text-sm font-medium text-[#20201E] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-[#7A7771] font-sans flex items-center gap-2">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                    </div>
                    <div className="font-sans text-xs font-semibold text-[#20201E]">
                      ${item.product.price}
                    </div>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#DFD7CB]/50">
                    <div className="flex items-center border border-[#DFD7CB] rounded bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#52504C] hover:text-[#20201E]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#52504C] hover:text-[#20201E]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#7A7771] hover:text-rose-700 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#DFD7CB] bg-[#F7F3ED] space-y-4">
            
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. AK10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 text-xs bg-white border border-[#DFD7CB] rounded-sm uppercase tracking-wider focus:outline-none focus:border-[#B89562]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#20201E] text-white text-[11px] uppercase tracking-wider rounded-sm font-sans"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <div className={`text-[11px] ${discountPercent > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {promoMessage}
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#52504C] font-sans border-t border-[#DFD7CB]/60 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#20201E]">${subtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Courtesy Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove Shipping</span>
                <span>{shippingFee === 0 ? 'COMPLIMENTARY' : `$${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#20201E] border-t border-[#DFD7CB] pt-2">
                <span>Estimated Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full py-3.5 bg-[#20201E] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#31443A] transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="text-[10px] text-center text-[#7A7771] font-sans">
              Encrypted 256-Bit Checkout · Complimentary 30-Day Alterations
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
