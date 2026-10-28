import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Play, Pause, ChevronLeft, ChevronRight, Eye, MoveHorizontal } from 'lucide-react';
import { Product } from '../types';

interface InfiniteClothingRackProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const InfiniteClothingRack: React.FC<InfiniteClothingRackProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  // Filter rack-eligible garments or take all
  const rackProducts = products.filter((p) => p.rackFeatured || p.category === 'men' || p.category === 'wedding').slice(0, 6);
  // Duplicate array 3 times to allow seamless infinite loop
  const displayItems = [...rackProducts, ...rackProducts, ...rackProducts];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [scrollSpeed, setScrollSpeed] = useState<number>(0.4); // speed factor
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [currentTranslateX, setCurrentTranslateX] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);

  // Auto-scroll loop
  useEffect(() => {
    const totalLoopWidth = rackProducts.length * 320; // 320px per hanger slot

    const animate = () => {
      if (isPlaying && !hoveredIndex && !isDragging) {
        offsetRef.current -= scrollSpeed;
        if (Math.abs(offsetRef.current) >= totalLoopWidth) {
          offsetRef.current = 0;
        }
        setCurrentTranslateX(offsetRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, hoveredIndex, isDragging, scrollSpeed, rackProducts.length]);

  // Mouse & Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - offsetRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newOffset = e.clientX - startX;
    offsetRef.current = newOffset;
    setCurrentTranslateX(newOffset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - offsetRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const newOffset = e.touches[0].clientX - startX;
    offsetRef.current = newOffset;
    setCurrentTranslateX(newOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handlePrev = () => {
    offsetRef.current += 320;
    setCurrentTranslateX(offsetRef.current);
  };

  const handleNext = () => {
    offsetRef.current -= 320;
    setCurrentTranslateX(offsetRef.current);
  };

  return (
    <section
      id="clothing-rack-section"
      className="relative bg-[#F7F3ED] py-16 sm:py-24 overflow-hidden border-b border-[#DFD7CB]/60 select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-[#FAF8F4] via-[#F7F3ED] to-[#E8DED1]/30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#B89562] font-semibold font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature 3D Interactive Rail Experience</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#20201E]">
              Explore The Rack
            </h2>
            <p className="text-xs sm:text-sm text-[#52504C] font-light max-w-xl">
              Continuous sartorial rail. Hover any garment to pull it forward from the rack; tap or click to rotate 360° and inspect artisanal details.
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex items-center gap-3 bg-[#FAF8F4] p-1.5 rounded-sm border border-[#DFD7CB] shadow-sm self-start md:self-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 text-xs font-sans uppercase tracking-wider text-[#20201E] hover:text-[#B89562] flex items-center gap-1.5 transition-colors"
              title={isPlaying ? 'Pause Auto-Rail' : 'Play Auto-Rail'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Pause Drift</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#20201E]" />
                  <span className="hidden sm:inline text-[11px]">Auto Drift</span>
                </>
              )}
            </button>

            <span className="text-[#DFD7CB]">|</span>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full hover:bg-[#E8DED1] text-[#20201E] transition-colors"
                aria-label="Previous Garment"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-full hover:bg-[#E8DED1] text-[#20201E] transition-colors"
                aria-label="Next Garment"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[#DFD7CB] hidden sm:inline">|</span>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#7A7771] px-2">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#B89562]" />
              <span>Drag to slide rail</span>
            </div>
          </div>
        </div>

        {/* 3D Clothing Rail Canvas Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full h-[540px] sm:h-[600px] perspective-2000 overflow-hidden cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
        >
          {/* Real Brushed Brass Horizontal Clothing Rail across the top */}
          <div className="absolute top-12 left-0 right-0 z-30 flex items-center pointer-events-none">
            {/* Left bracket */}
            <div className="w-4 h-10 bg-gradient-to-b from-[#8C6F45] to-[#4A3B25] shadow-md"></div>
            {/* The continuous brass bar */}
            <div className="w-full h-3 bg-gradient-to-b from-[#D4AF37] via-[#F3E5AB] to-[#8C6F45] shadow-md border-y border-[#B89562]"></div>
            {/* Right bracket */}
            <div className="w-4 h-10 bg-gradient-to-b from-[#8C6F45] to-[#4A3B25] shadow-md"></div>
          </div>

          {/* Rail Track with Garments */}
          <div
            className="absolute top-0 left-0 h-full flex items-center transition-transform ease-out will-change-transform"
            style={{
              transform: `translateX(${currentTranslateX}px)`,
              transitionDuration: isDragging ? '0ms' : '150ms',
            }}
          >
            {displayItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={`${item.id}-${index}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => onSelectProduct(item)}
                  className="relative w-[320px] h-[500px] flex-shrink-0 flex flex-col items-center justify-start pt-11 px-4 cursor-pointer group"
                  style={{
                    perspective: '1000px',
                    zIndex: isHovered ? 40 : 10,
                  }}
                >
                  {/* The Hanger & Garment 3D Pull-Out Wrapper */}
                  <div
                    className={`relative w-full flex flex-col items-center transition-all duration-500 ease-out preserve-3d ${
                      isHovered
                        ? 'scale-110 -translate-y-4 filter drop-shadow-2xl'
                        : 'scale-95 group-hover:scale-100'
                    }`}
                    style={{
                      transform: isHovered
                        ? 'translateZ(90px) translateY(-14px) scale(1.12)'
                        : 'translateZ(0px) translateY(0) scale(0.96)',
                    }}
                  >
                    {/* Realistic Brass Swivel Hook */}
                    <div className="relative z-30 flex flex-col items-center -mb-2">
                      <div
                        className={`w-4 h-8 border-t-[3px] border-r-[3px] rounded-tr-full transition-colors ${
                          isHovered
                            ? 'border-[#D4AF37] shadow-sm'
                            : 'border-[#9A7849]'
                        }`}
                        style={{
                          transform: 'rotate(15deg) translateY(2px)',
                        }}
                      ></div>
                    </div>

                    {/* Realistic Wooden Hanger Body */}
                    <div className="relative z-20 w-48 h-6 bg-gradient-to-b from-[#8F6A44] to-[#5C3F22] rounded-t-full shadow-md flex items-center justify-center border-t border-[#A88155]">
                      {/* Brand Stamp on Hanger */}
                      <span className="text-[7px] text-[#E8DED1] tracking-widest uppercase font-serif font-semibold">
                        AK GARMENTS
                      </span>

                      {/* Hanger Notch Tag (like -20%, NEW, ONLY 3 LEFT) */}
                      {item.tag && (
                        <div
                          className={`absolute -top-3 -right-2 px-2 py-0.5 rounded-sm text-[8px] font-sans font-bold uppercase tracking-wider shadow-sm transition-transform ${
                            item.tag.includes('ONLY')
                              ? 'bg-amber-900 text-amber-100'
                              : item.tag.includes('NEW')
                              ? 'bg-[#31443A] text-emerald-100'
                              : 'bg-[#20201E] text-white'
                          } ${isHovered ? 'scale-110 rotate-3' : ''}`}
                        >
                          {item.tag}
                        </div>
                      )}
                    </div>

                    {/* Garment Image on Hanger */}
                    <div className="relative w-full h-[320px] flex items-center justify-center overflow-visible mt-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`max-h-[300px] w-auto max-w-[260px] object-contain transition-all duration-500 filter ${
                          isHovered
                            ? 'brightness-105 drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]'
                            : 'drop-shadow-[0_12px_12px_rgba(0,0,0,0.12)]'
                        }`}
                      />

                      {/* Hover Overlay 3D Action Pill */}
                      {isHovered && (
                        <div className="absolute inset-x-0 bottom-4 flex justify-center z-40 animate-fade-in pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#20201E]/90 text-white text-[11px] font-sans font-medium tracking-wider uppercase backdrop-blur-sm shadow-xl">
                            <Eye className="w-3.5 h-3.5 text-[#B89562]" />
                            <span>Inspect in 3D</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Studio Ground Shadow beneath the garment */}
                    <div
                      className={`w-36 h-3 rounded-full bg-black/15 blur-sm transition-all duration-500 mt-2 ${
                        isHovered ? 'w-44 h-4 bg-black/25 blur-md scale-110' : ''
                      }`}
                    ></div>

                    {/* Garment Label & Price Card below */}
                    <div
                      className={`w-full text-center mt-3 px-2 transition-all duration-300 ${
                        isHovered ? 'translate-y-1' : ''
                      }`}
                    >
                      <h3 className="font-serif text-lg font-medium text-[#20201E] group-hover:text-[#B89562] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mt-0.5">
                        <span className="font-sans text-xs font-semibold text-[#20201E]">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="font-sans text-[11px] text-zinc-400 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                        <span className="text-[10px] text-[#7A7771] font-sans">
                          · {item.fabric.split(',')[0]}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Vignette Shadows for Seamless Horizon */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F3ED] to-transparent pointer-events-none z-30"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F7F3ED] to-transparent pointer-events-none z-30"></div>
        </div>

        {/* Feature Hint Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7771] pt-6 border-t border-[#DFD7CB]/50 gap-4 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse"></span>
            <span>All garments photographed from physical studio samples · Ready-to-wear & Custom sizes available</span>
          </div>
          <button
            onClick={() => onSelectProduct(rackProducts[0])}
            className="text-[#20201E] hover:text-[#B89562] font-medium underline underline-offset-4 tracking-wider uppercase text-[11px]"
          >
            Open 3D Studio Showcase →
          </button>
        </div>

      </div>
    </section>
  );
};
