import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
import { Product } from '../types';

interface WeddingOccasionProps {
  onSelectProduct: (product: Product) => void;
  onOpenTailoring: () => void;
  weddingProducts: Product[];
}

export const WeddingOccasion: React.FC<WeddingOccasionProps> = ({
  onSelectProduct,
  onOpenTailoring,
  weddingProducts,
}) => {
  return (
    <section className="bg-[#F7F3ED] py-16 sm:py-24 border-b border-[#DFD7CB]/60 relative overflow-hidden">
      {/* Subtle Royal Damask Pattern Backdrop */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#B89562_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B89562]/15 text-[#B89562] text-[10px] uppercase tracking-[0.25em] font-sans font-semibold">
            <Crown className="w-3.5 h-3.5 text-[#B89562]" />
            <span>The Matrimonial & Ceremonial Edit</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#20201E]">
            Royal Wedding & Occasion Wear
          </h2>
          <p className="text-xs sm:text-sm text-[#52504C] font-light">
            Heirloom zardozi sherwanis, bespoke velvet tuxedos, and silk ensembles woven for eternal celebrations.
          </p>
        </div>

        {/* Highlight Banner with Royal Groom Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm p-6 sm:p-10 shadow-luxury mb-12">
          
          {/* Left: Imperial Sherwani Spotlight */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-sm bg-[#E8DED1]">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/images/royal-sherwani-gold.png"
                alt="Imperial Ivory Royal Sherwani"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#20201E]/90 text-[#F7F3ED] text-[10px] font-sans tracking-widest uppercase">
              The Royal Groom Signature
            </div>
          </div>

          {/* Right: Editorial Narrative & Booking */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B89562] font-semibold font-sans">
                Masterpiece Heritage Edition
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#20201E] font-normal leading-snug">
                Imperial Ivory Hand-Embroidered Zari Sherwani
              </h3>
              <p className="text-xs sm:text-sm text-[#52504C] leading-relaxed font-light">
                Created with 280 hours of hand needlework using pure gilded gold threads and micro-seed pearls. Includes matching silk churidar, hand-pleated royal safa, and stole.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-[#DFD7CB]/80 py-4 font-sans text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B89562]" />
                <span className="text-[#20201E] font-medium">Pure Mulberry Silk Base</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#B89562]" />
                <span className="text-[#20201E] font-medium">Bespoke Groom Trial Fitting</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const sherwani = weddingProducts.find((p) => p.id === 'rack-5') || weddingProducts[0];
                  if (sherwani) onSelectProduct(sherwani);
                }}
                className="px-6 py-3.5 bg-[#20201E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#31443A] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <span>Inspect Sherwani in 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenTailoring}
                className="px-6 py-3.5 border border-[#B89562] text-[#20201E] hover:bg-[#B89562]/10 text-xs uppercase tracking-widest font-medium transition-colors rounded-sm text-center"
              >
                Book Bridal / Groom Styling Session
              </button>
            </div>
          </div>

        </div>

        {/* Wedding Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddingProducts.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="group bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm overflow-hidden shadow-sm hover:shadow-luxury hover:border-[#B89562] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DED1]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {item.tag && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-[#20201E]/90 text-white text-[9px] uppercase tracking-wider font-sans">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-4 bg-[#F7F3ED] border-t border-[#DFD7CB]/60">
                <div className="text-[10px] uppercase tracking-wider text-[#B89562] font-semibold">
                  {item.subCategory}
                </div>
                <h4 className="font-serif text-lg text-[#20201E] group-hover:text-[#B89562] transition-colors mt-0.5">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#DFD7CB]/40 text-xs">
                  <span className="font-semibold text-[#20201E]">${item.price}</span>
                  <span className="text-[11px] text-[#7A7771] underline group-hover:text-[#20201E]">
                    Explore Piece →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
