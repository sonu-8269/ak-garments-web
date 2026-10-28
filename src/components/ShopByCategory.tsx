import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface ShopByCategoryProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenTailoring: () => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  onSelectCategory,
  onOpenTailoring,
}) => {
  return (
    <section className="bg-[#FAF8F4] py-16 sm:py-24 border-b border-[#DFD7CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-[#B89562] font-semibold font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sartorial Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#20201E]">
              Shop By Category
            </h2>
            <p className="text-xs sm:text-sm text-[#52504C] font-light max-w-lg">
              Explore bespoke menswear, contemporary womenswear, royal wedding regalia, and custom-stitching services.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs tracking-widest uppercase font-medium text-[#20201E] hover:text-[#B89562] flex items-center gap-1 underline underline-offset-4 font-sans self-start sm:self-auto"
          >
            <span>View Full Catalogue</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Grid: Inspired by Modeza & Shopio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                if (category.id === 'tailoring') {
                  onOpenTailoring();
                } else {
                  onSelectCategory(category.id);
                }
              }}
              className="group relative bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm overflow-hidden shadow-sm hover:shadow-luxury hover:border-[#B89562] transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Category Image with Aspect Ratio and Zoom */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E8DED1]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Count Badge */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-sans font-medium text-[#20201E] shadow-sm">
                  {typeof category.itemsCount === 'number'
                    ? `${category.itemsCount} Pieces`
                    : category.itemsCount}
                </div>

                {/* Subcategory Pills Preview on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-wrap gap-1">
                  {category.subcategories.slice(0, 3).map((sub, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-sans"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category Info Footer */}
              <div className="p-5 flex items-center justify-between bg-[#FAF8F4] border-t border-[#DFD7CB]/60">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-medium text-[#20201E] group-hover:text-[#B89562] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[11px] text-[#7A7771] font-light line-clamp-1">
                    {category.tagline}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#DFD7CB] flex items-center justify-center text-[#20201E] group-hover:bg-[#20201E] group-hover:text-white group-hover:border-[#20201E] transition-all flex-shrink-0 ml-2">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
