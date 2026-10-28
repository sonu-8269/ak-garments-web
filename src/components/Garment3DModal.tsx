import React, { useState } from 'react';
import { X, RotateCw, ShoppingBag, Heart, Check, Sparkles, Scissors, ShieldCheck, Ruler } from 'lucide-react';
import { Product } from '../types';

interface Garment3DModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenTailoringForGarment: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const Garment3DModal: React.FC<Garment3DModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenTailoringForGarment,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [viewAngle, setViewAngle] = useState<'front' | 'back'>('front');
  const [customRotation, setCustomRotation] = useState<number>(0);
  const [isRotating, setIsRotating] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const toggleFrontBack = (angle: 'front' | 'back') => {
    setViewAngle(angle);
    setCustomRotation(angle === 'front' ? 0 : 180);
  };

  const handleRotateBy = (deg: number) => {
    setCustomRotation((prev) => {
      const next = (prev + deg) % 360;
      setViewAngle(Math.abs(next) >= 90 && Math.abs(next) <= 270 ? 'back' : 'front');
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#20201E]/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col animate-fade-in">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DFD7CB] bg-[#F7F3ED]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#B89562] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Garment Inspector</span>
            </span>
            {product.tag && (
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#20201E] text-white font-sans uppercase">
                {product.tag}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E8DED1] text-[#20201E] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split 3D Viewport & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          
          {/* Left Column: 3D Garment Studio */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#F7F3ED] flex flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-[#DFD7CB] relative select-none">
            
            {/* Top 3D Control Ribbon */}
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 bg-[#FAF8F4] p-1 rounded-sm border border-[#DFD7CB]">
                <button
                  onClick={() => toggleFrontBack('front')}
                  className={`px-3 py-1 text-xs tracking-wider uppercase font-sans rounded-xs transition-all ${
                    viewAngle === 'front'
                      ? 'bg-[#20201E] text-white font-medium'
                      : 'text-[#52504C] hover:text-[#20201E]'
                  }`}
                >
                  Front View
                </button>
                <button
                  onClick={() => toggleFrontBack('back')}
                  className={`px-3 py-1 text-xs tracking-wider uppercase font-sans rounded-xs transition-all ${
                    viewAngle === 'back'
                      ? 'bg-[#20201E] text-white font-medium'
                      : 'text-[#52504C] hover:text-[#20201E]'
                  }`}
                >
                  Back View
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRotateBy(-45)}
                  className="p-1.5 text-xs bg-[#FAF8F4] border border-[#DFD7CB] text-[#52504C] hover:text-[#20201E] rounded-sm transition-colors flex items-center gap-1"
                  title="Rotate left 45°"
                >
                  <RotateCw className="w-3.5 h-3.5 -scale-x-100" />
                  <span className="text-[10px] hidden sm:inline">-45°</span>
                </button>
                <button
                  onClick={() => handleRotateBy(45)}
                  className="p-1.5 text-xs bg-[#FAF8F4] border border-[#DFD7CB] text-[#52504C] hover:text-[#20201E] rounded-sm transition-colors flex items-center gap-1"
                  title="Rotate right 45°"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">+45°</span>
                </button>
              </div>
            </div>

            {/* 3D Model Stage with Realistic Wooden Hanger & Garment */}
            <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center my-4 perspective-1200">
              
              {/* Studio Backdrop Ring */}
              <div className="absolute inset-0 bg-radial from-[#FAF8F4] to-[#E8DED1]/50 rounded-full blur-2xl -z-10 transform scale-90"></div>

              {/* Realistic Brass Rail Hook at Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                {/* Brass horizontal rail fragment */}
                <div className="w-64 h-1.5 bg-gradient-to-r from-[#8C6F45] via-[#D4AF37] to-[#8C6F45] rounded-full shadow-sm"></div>
                {/* Hanger Hook */}
                <div className="w-5 h-8 border-t-2 border-r-2 border-[#9A7849] rounded-tr-full transform rotate-12 -mt-0.5"></div>
              </div>

              {/* 3D Rotating Container */}
              <div
                className="w-full h-full preserve-3d transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing flex items-center justify-center"
                style={{
                  transform: `rotateY(${customRotation}deg) scale(0.95)`,
                }}
              >
                {/* Front Side */}
                <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={`${product.name} Front`}
                      className="max-h-[85%] max-w-[90%] object-contain filter drop-shadow-2xl transition-all"
                    />
                  </div>
                </div>

                {/* Back Side (180deg flip) */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={product.backImage || product.image}
                      alt={`${product.name} Back`}
                      className="max-h-[85%] max-w-[90%] object-contain filter drop-shadow-2xl brightness-95"
                    />
                    {/* Visual back label indicator */}
                    <div className="absolute top-8 px-2 py-0.5 bg-black/40 text-white text-[9px] uppercase tracking-widest rounded-full backdrop-blur-sm">
                      Rear Sartorial Cut
                    </div>
                  </div>
                </div>
              </div>

              {/* Studio Floor Soft Drop Shadow */}
              <div className="absolute bottom-2 w-48 h-4 bg-black/15 rounded-full blur-md"></div>
            </div>

            {/* Interactive Angle Slider */}
            <div className="w-full max-w-xs space-y-1 mt-2">
              <div className="flex items-center justify-between text-[10px] text-[#7A7771] uppercase tracking-widest font-sans">
                <span>0° Front</span>
                <span className="text-[#20201E] font-medium font-mono">{customRotation}°</span>
                <span>180° Back</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={customRotation}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCustomRotation(val);
                  setViewAngle(val >= 90 && val <= 270 ? 'back' : 'front');
                }}
                className="w-full accent-[#B89562] cursor-pointer h-1 bg-[#DFD7CB] rounded-lg"
              />
            </div>
          </div>

          {/* Right Column: Sartorial Details, Variants & Actions */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Product Title & Category */}
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89562] font-semibold font-sans">
                  {product.subCategory}
                </span>
                <h2 className="font-serif text-3xl font-normal text-[#20201E] mt-1 leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-[#52504C] font-light mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between border-y border-[#DFD7CB]/70 py-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-serif text-2xl font-semibold text-[#20201E]">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-sans">
                    In Stock · Ready to Ship
                  </span>
                </div>
                {product.rating && (
                  <div className="text-right">
                    <div className="text-xs font-serif font-bold text-[#B89562]">
                      ★ {product.rating} / 5.0
                    </div>
                    <div className="text-[10px] text-zinc-400 font-sans">
                      ({product.reviewsCount} verified reviews)
                    </div>
                  </div>
                )}
              </div>

              {/* Fabric Specs */}
              <div className="p-3 bg-[#F7F3ED] rounded-sm border border-[#DFD7CB]/70 space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-[#7A7771] font-sans font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B89562]" />
                  <span>AK Garments Fabric Specification</span>
                </div>
                <div className="text-xs text-[#20201E] font-medium">
                  {product.fabric}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-sans font-medium text-[#20201E]">
                    Colour: <span className="font-normal text-[#52504C]">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`group relative p-0.5 rounded-full border transition-all ${
                        selectedColor === color.name
                          ? 'border-[#20201E] scale-110'
                          : 'border-transparent hover:border-zinc-300'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-sans font-medium text-[#20201E]">
                    Select Size:
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-[11px] text-[#B89562] hover:underline flex items-center gap-1 font-sans"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide & Metrics</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 text-xs font-sans rounded-xs border transition-all ${
                        selectedSize === size
                          ? 'bg-[#20201E] text-white border-[#20201E]'
                          : 'bg-[#FAF8F4] text-[#52504C] border-[#DFD7CB] hover:border-[#20201E]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Description */}
              <p className="text-xs text-[#52504C] leading-relaxed font-light">
                {product.description}
              </p>

              {/* Key Sartorial Details */}
              <ul className="text-[11px] text-[#52504C] space-y-1 list-disc list-inside">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            {/* Actions: Add to Bag & Custom Tailoring Option */}
            <div className="space-y-2.5 pt-4 border-t border-[#DFD7CB]">
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#20201E] text-[#F7F3ED] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#31443A] transition-colors rounded-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B89562]" />
                  <span>Add To Shopping Bag</span>
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 border rounded-sm transition-colors ${
                    isWishlisted
                      ? 'border-[#B89562] bg-[#B89562]/10 text-[#B89562]'
                      : 'border-[#DFD7CB] text-[#52504C] hover:text-[#20201E]'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#B89562]' : ''}`} />
                </button>
              </div>

              {/* Bespoke Tailoring Redirection Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenTailoringForGarment(product);
                }}
                className="w-full py-2.5 px-4 bg-[#FAF8F4] border border-[#B89562] text-[#20201E] hover:bg-[#E8DED1] text-xs uppercase tracking-widest font-sans font-medium rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <Scissors className="w-3.5 h-3.5 text-[#B89562]" />
                <span>Custom Stitch / Made-To-Measure Option</span>
              </button>

              {/* Success Notification Toast */}
              {addedToast && (
                <div className="p-2.5 bg-[#31443A] text-white text-xs font-sans rounded text-center flex items-center justify-center gap-2 animate-fade-in">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added {product.name} ({selectedSize}) to your bag</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
