import React, { useState } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const quickTags = [
    'Sherwani',
    'Italian Suit',
    'Poplin Shirt',
    'Hoodie',
    'Crewneck',
    'Merino Wool',
    'Linen Suit',
    'Bespoke',
  ];

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#20201E]/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm shadow-2xl z-10 animate-fade-in overflow-hidden mt-10">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#DFD7CB] bg-[#F7F3ED] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#B89562]" />
          <input
            type="text"
            autoFocus
            placeholder="Search tailored suits, royal sherwanis, fabrics, knitwear..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-base sm:text-lg text-[#20201E] placeholder-zinc-400 focus:outline-none font-serif"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs uppercase text-[#7A7771] hover:text-[#20201E] px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#E8DED1] text-[#20201E]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#7A7771] font-sans font-medium">
              Popular Sartorial Searches
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-[#F7F3ED] hover:bg-[#E8DED1] text-xs font-sans rounded-full text-[#52504C] transition-colors border border-[#DFD7CB]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          {query.trim() && (
            <div className="pt-2 border-t border-[#DFD7CB] space-y-3">
              <div className="text-xs text-[#7A7771]">
                Found <strong>{results.length}</strong> matching creations for "{query}"
              </div>

              {results.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#7A7771]">
                  No matching garments found. Try searching for "Suit", "Silk", or "Sherwani".
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="p-3 bg-[#F7F3ED] hover:bg-[#E8DED1] border border-[#DFD7CB] rounded-sm flex items-center justify-between cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 bg-zinc-200 rounded-sm overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-[#B89562] font-semibold">
                            {product.subCategory}
                          </div>
                          <h4 className="font-serif text-sm font-medium text-[#20201E] group-hover:text-[#B89562] transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#20201E]">
                            ₹{product.price}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-[#7A7771] group-hover:translate-x-1 group-hover:text-[#20201E] transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
