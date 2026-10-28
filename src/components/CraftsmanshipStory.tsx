import React from 'react';
import { Scissors, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface CraftsmanshipStoryProps {
  onOpenTailoring: () => void;
}

export const CraftsmanshipStory: React.FC<CraftsmanshipStoryProps> = ({
  onOpenTailoring,
}) => {
  return (
    <section className="bg-[#FAF8F4] py-16 sm:py-24 border-b border-[#DFD7CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Master Tailor in Atelier Photo */}
          <div className="lg:col-span-6 relative group overflow-hidden rounded-sm shadow-luxury bg-[#E8DED1]">
            <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
              <img
                src="/images/master-craftsman-atelier.png"
                alt="Master Tailor at Work in Atelier"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Overlay Tag */}
            <div className="absolute bottom-4 left-4 bg-[#20201E]/90 text-[#F7F3ED] px-4 py-2 rounded-sm backdrop-blur-sm text-xs font-sans tracking-widest uppercase flex items-center gap-2">
              <Scissors className="w-3.5 h-3.5 text-[#B89562]" />
              <span>Full Floating Canvas Craft</span>
            </div>
          </div>

          {/* Right: Atelier Heritage Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89562] font-semibold font-sans">
                Generational Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#20201E] leading-tight">
                The Art of The Floating Canvas
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#52504C] font-light leading-relaxed">
              Unlike industrial garments bonded with synthetic glues that stiffen after dry cleaning, every Atelier & Co. tailored suit is crafted with an authentic floating horsehair canvas interlining. Over time, natural body warmth gently molds the jacket to your individual posture.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#20201E]">
                  <Award className="w-4 h-4 text-[#B89562]" />
                  <span>Individual Paper Patterns</span>
                </div>
                <p className="text-[11px] text-[#7A7771]">
                  Every bespoke client receives a hand-drafted pattern stored in our permanent physical archives.
                </p>
              </div>

              <div className="p-4 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#20201E]">
                  <ShieldCheck className="w-4 h-4 text-[#B89562]" />
                  <span>Noble Mill Provenance</span>
                </div>
                <p className="text-[11px] text-[#7A7771]">
                  Directly sourced from Loro Piana, Thomas Mason, and generational weavers in Varanasi and Como.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenTailoring}
                className="px-7 py-3.5 bg-[#20201E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#31443A] transition-colors rounded-sm inline-flex items-center gap-2 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B89562]" />
                <span>Commission A Bespoke Garment</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
