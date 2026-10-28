import React from 'react';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface EditorialLookbookProps {
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

export const EditorialLookbook: React.FC<EditorialLookbookProps> = ({
  onSelectProduct,
  products,
}) => {
  const featuredSuit = products.find((p) => p.id === 'rack-4') || products[0];
  const featuredShirt = products.find((p) => p.id === 'rack-3') || products[1];

  return (
    <section id="lookbook-section" className="bg-[#F7F3ED] py-16 sm:py-24 border-b border-[#DFD7CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lookbook Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89562] font-semibold font-sans">
            Campaign Editorial 2026
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#20201E]">
            Parallel Perspectives
          </h2>
          <p className="text-xs sm:text-sm text-[#52504C] font-light italic">
            "True luxury does not shout; it drapes effortlessly and endures quietly."
          </p>
        </div>

        {/* Dual Split Magazine Composition (Inspired by Reference Pasted image.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Lookbook Card */}
          <div className="lg:col-span-6 relative group overflow-hidden rounded-sm bg-[#E8DED1] shadow-luxury">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/images/lookbook-parallel.png"
                alt="Parallel Perspectives Editorial"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Shoppable Hotspot Pin */}
            <div
              onClick={() => onSelectProduct(featuredShirt)}
              className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin z-20"
            >
              <div className="relative">
                <span className="w-6 h-6 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#20201E] text-xs font-bold border border-[#B89562] animate-pulse">
                  +
                </span>
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-48 p-2.5 bg-white/95 backdrop-blur-md rounded-sm shadow-xl text-left border border-[#DFD7CB] opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="text-[9px] uppercase tracking-wider text-[#B89562] font-semibold">
                    Shop The Look
                  </div>
                  <div className="font-serif text-xs font-medium text-[#20201E]">
                    {featuredShirt.name}
                  </div>
                  <div className="text-[10px] font-sans font-semibold text-[#31443A] mt-0.5">
                    ${featuredShirt.price}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#FAF8F4] border-t border-[#DFD7CB]/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#7A7771] font-sans">
                  Plate 01 · Minimal Sartorial
                </span>
                <h3 className="font-serif text-xl text-[#20201E]">
                  Relaxed Denim & Poplin Architecture
                </h3>
              </div>
              <button
                onClick={() => onSelectProduct(featuredShirt)}
                className="p-2.5 rounded-full border border-[#DFD7CB] hover:bg-[#20201E] hover:text-white transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Lookbook Editorial Layout */}
          <div className="lg:col-span-6 space-y-8">
            <div className="relative group overflow-hidden rounded-sm bg-[#E8DED1] shadow-luxury">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/images/brunello-editorial-grid.png"
                  alt="Brunello Cucinelli Editorial Grid Reference"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 bg-[#FAF8F4] border-t border-[#DFD7CB]/60">
                <span className="text-[10px] uppercase tracking-widest text-[#7A7771] font-sans">
                  Plate 02 · Atelier Studio
                </span>
                <h3 className="font-serif text-xl text-[#20201E] mt-0.5">
                  The Tactile Poetry of Natural Fibres
                </h3>
                <p className="text-xs text-[#52504C] font-light mt-1">
                  Virgin merino wool, raw silk slubs, and breathable Irish linen woven to capture the soft light of Italian ateliers.
                </p>
              </div>
            </div>

            {/* Quote block */}
            <div className="p-6 bg-[#E8DED1]/40 border-l-2 border-[#B89562] rounded-r-sm space-y-2">
              <div className="font-serif text-lg text-[#20201E] italic">
                “In tailoring, balance is achieved when garment and body exist in uninterrupted dialogue.”
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#7A7771] font-sans">
                — Head Pattern Cutter, Atelier & Co.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
