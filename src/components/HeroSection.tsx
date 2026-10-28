import React from 'react';
import { ArrowRight, Sparkles, Scissors, Compass } from 'lucide-react';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onOpenTailoring: () => void;
  onExploreRack: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onOpenTailoring,
  onExploreRack,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#F7F3ED] pt-6 pb-16 lg:py-20 border-b border-[#DFD7CB]/40">
      {/* Subtle Background Geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8DED1]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#B89562]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DED1]/70 border border-[#DFD7CB] text-[11px] font-sans tracking-[0.2em] uppercase text-[#52504C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89562]"></span>
              <span>The Autumn / Sartorial Edit 2026</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#20201E] tracking-tight">
                Wear Your <br />
                <span className="italic font-light text-[#B89562]">Signature.</span>
              </h1>
              <p className="text-sm sm:text-base text-[#52504C] font-light leading-relaxed max-w-md">
                Considered essentials, royal matrimonial regalia, and bespoke made-to-measure clothing tailored precisely to your silhouette.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onExploreCollection}
                className="group px-7 py-3.5 bg-[#20201E] text-[#F7F3ED] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#31443A] transition-all duration-300 flex items-center justify-center gap-3 shadow-md rounded-sm"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenTailoring}
                className="px-7 py-3.5 bg-transparent border border-[#20201E] text-[#20201E] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#E8DED1] transition-all duration-300 flex items-center justify-center gap-2.5 rounded-sm"
              >
                <Scissors className="w-3.5 h-3.5 text-[#B89562]" />
                <span>Custom Tailoring</span>
              </button>
            </div>

            {/* Signature Feature Banner Trigger */}
            <div className="pt-2">
              <button
                onClick={onExploreRack}
                className="group w-full sm:w-auto p-3.5 bg-[#FAF8F4] border border-[#DFD7CB] hover:border-[#B89562] transition-all rounded-sm flex items-center justify-between gap-4 text-left shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B89562]/15 flex items-center justify-center text-[#B89562]">
                    <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-semibold text-[#20201E] tracking-wide flex items-center gap-1.5">
                      <span>3D Infinite Clothing Rack</span>
                      <span className="text-[9px] bg-[#31443A] text-white px-1.5 py-0.2 rounded font-sans uppercase">
                        Interactive
                      </span>
                    </div>
                    <div className="text-[11px] text-[#7A7771]">
                      Pull garments forward & flip front/back views
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B89562] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Sartorial Quality Indicators */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-[#DFD7CB]/70 text-[#52504C]">
              <div>
                <div className="font-serif text-2xl font-medium text-[#20201E]">100%</div>
                <div className="text-[10px] tracking-wider uppercase text-[#7A7771] mt-0.5">
                  Natural Italian Fibres
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl font-medium text-[#20201E]">45+</div>
                <div className="text-[10px] tracking-wider uppercase text-[#7A7771] mt-0.5">
                  Bespoke Metrics
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl font-medium text-[#20201E]">30 Day</div>
                <div className="text-[10px] tracking-wider uppercase text-[#7A7771] mt-0.5">
                  Free Alterations
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High Fashion Editorial Split Visuals */}
          <div className="lg:col-span-7 relative">
            <div className="relative grid grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* Primary Campaign Card (Men & Women Sartorial Editorial) */}
              <div className="col-span-8 relative group overflow-hidden rounded-sm shadow-luxury border border-[#DFD7CB]/60 bg-[#E8DED1]">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/luxury-editorial-duo.png"
                    alt="AK Garments Luxury Fashion Campaign"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8DED1] font-sans">
                    Parallel Perspectives
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-light">
                    Sartorial Harmony in Linen
                  </span>
                </div>
              </div>

              {/* Secondary Floating Card (Tailored Suit & Sherwani Glance) */}
              <div className="col-span-4 space-y-3 sm:space-y-4">
                <div className="relative group overflow-hidden rounded-sm shadow-luxury border border-[#DFD7CB]/60 bg-[#E8DED1]">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src="/images/tailored-suit-sand.png"
                      alt="Sand Dune Tailored Suit"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-2.5 bg-[#FAF8F4] border-t border-[#DFD7CB]/40">
                    <div className="text-[10px] uppercase tracking-wider text-[#B89562] font-semibold">
                      Suits & Blazers
                    </div>
                    <div className="text-xs font-serif text-[#20201E] truncate">
                      Super 150s Merino
                    </div>
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-sm shadow-luxury border border-[#DFD7CB]/60 bg-[#E8DED1]">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src="/images/royal-sherwani-gold.png"
                      alt="Royal Ivory Sherwani Set"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-2.5 bg-[#FAF8F4] border-t border-[#DFD7CB]/40">
                    <div className="text-[10px] uppercase tracking-wider text-[#B89562] font-semibold">
                      Royal Matrimonial
                    </div>
                    <div className="text-xs font-serif text-[#20201E] truncate">
                      Imperial Zari Sherwani
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Luxury Seal */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-[#FAF8F4] border border-[#DFD7CB] p-3 rounded-sm shadow-luxury">
              <div className="w-10 h-10 rounded-full border border-[#B89562] flex items-center justify-center text-[#B89562] bg-[#FAF8F4]">
                <Sparkles className="w-5 h-5 text-[#B89562]" />
              </div>
              <div className="text-left pr-2">
                <div className="text-[11px] font-serif font-bold text-[#20201E] tracking-wider uppercase">
                  AK Garments
                </div>
                <div className="text-[9px] text-[#7A7771] tracking-widest uppercase">
                  Savile Row & Italian Canvassing
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
