import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
  RotateCw,
  Play,
  Pause,
  Eye,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { RunwayLook, RunwayPiece } from '../types';
import { RUNWAY_LOOKS_WOMEN, RUNWAY_LOOKS_MEN } from '../data/runwayData';

interface RunwayLineupProps {
  onOpenLook: (look: RunwayLook) => void;
  onAddToCart: (piece: RunwayPiece, look: RunwayLook) => void;
  onToggleWishlist: (pieceId: string) => void;
  wishlistIds: string[];
  activeGender: 'women' | 'men';
  onGenderChange: (gender: 'women' | 'men') => void;
}

// Catwalk 3D Runway Ramp Slot Positions along the perspective runway corridor:
// Slot 0: Front of Runway (Forefront Spotlight Edge)
// Slot 1: Mid-Runway (Striding forward)
// Slot 2: Upper-Mid Runway
// Slot 3: Upper Ramp (Entering runway)
// Slot 4: Backstage Portal Left
// Slot 5: Backstage Portal Far
const RAMP_SLOTS = [
  { left: 74, bottom: 2, scale: 1, blur: 0, opacity: 1, zIndex: 35 },
  { left: 54, bottom: 20, scale: 0.82, blur: 0, opacity: 0.98, zIndex: 28 },
  { left: 39, bottom: 36, scale: 0.68, blur: 0.6, opacity: 0.92, zIndex: 22 },
  { left: 27, bottom: 48, scale: 0.56, blur: 1.4, opacity: 0.82, zIndex: 16 },
  { left: 18, bottom: 58, scale: 0.47, blur: 2.2, opacity: 0.68, zIndex: 12 },
  { left: 10, bottom: 65, scale: 0.40, blur: 3.2, opacity: 0.52, zIndex: 8 },
];

export const RunwayLineup: React.FC<RunwayLineupProps> = ({
  onOpenLook,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  activeGender,
  onGenderChange,
}) => {
  const looks = activeGender === 'women' ? RUNWAY_LOOKS_WOMEN : RUNWAY_LOOKS_MEN;

  // Active indices queue: index at position 0 is at front of ramp
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [hoveredWaitingIndex, setHoveredWaitingIndex] = useState<number | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<{ [lookId: string]: number }>({});
  const [isCrossFadingColor, setIsCrossFadingColor] = useState<boolean>(false);
  const [isGenderTransitioning, setIsGenderTransitioning] = useState<boolean>(false);

  // Auto Runway Show Mode ("apne aap aati jaye jaise fashion ramp show hoti hai")
  const [isAutoRunwayPlaying, setIsAutoRunwayPlaying] = useState<boolean>(true);

  // Gentle 3D perspective mouse tilt for the front model on catwalk
  const [catwalkTilt, setCatwalkTilt] = useState<number>(0);

  const frontLookIndex = order[0];
  const frontLook = looks[frontLookIndex] || looks[0];
  const activeColorIdx = selectedColorIndex[frontLook.id] || 0;
  const activeColor = frontLook.colors[activeColorIdx] || frontLook.colors[0];

  // Reset order when gender changes with staggered rise-up
  useEffect(() => {
    setIsGenderTransitioning(true);
    const timer = setTimeout(() => {
      setOrder([0, 1, 2, 3, 4, 5]);
      setIsGenderTransitioning(false);
      setCatwalkTilt(0);
    }, 250);
    return () => clearTimeout(timer);
  }, [activeGender]);

  // Next look: model steps forward down the ramp
  const handleNext = () => {
    setCatwalkTilt(0);
    setOrder((prev) => {
      const nextOrder = [...prev];
      const front = nextOrder.shift()!;
      nextOrder.push(front);
      return nextOrder;
    });
  };

  // Previous look: previous model steps out onto ramp
  const handlePrev = () => {
    setCatwalkTilt(0);
    setOrder((prev) => {
      const nextOrder = [...prev];
      const back = nextOrder.pop()!;
      nextOrder.unshift(back);
      return nextOrder;
    });
  };

  // Click waiting model directly brings them down the catwalk to front
  const handleSelectSlot = (slotIndex: number) => {
    if (slotIndex === 0) {
      onOpenLook(frontLook);
      return;
    }
    setCatwalkTilt(0);
    setOrder((prev) => {
      const targetLookIndex = prev[slotIndex];
      const remaining = prev.filter((i) => i !== targetLookIndex);
      return [targetLookIndex, ...remaining];
    });
  };

  // Silky smooth 60 FPS Auto Runway Show loop (NO LAG: fires only once per 5 seconds)
  useEffect(() => {
    if (!isAutoRunwayPlaying || hoveredWaitingIndex !== null) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoRunwayPlaying, hoveredWaitingIndex, order]);

  // Handle color variant change with blur-dissolve
  const handleColorChange = (index: number) => {
    if (index === activeColorIdx) return;
    setIsCrossFadingColor(true);
    setTimeout(() => {
      setSelectedColorIndex((prev) => ({
        ...prev,
        [frontLook.id]: index,
      }));
      setIsCrossFadingColor(false);
    }, 200);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Catwalk interactive mouse parallax tilt
  const handleCatwalkMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    setCatwalkTilt(Math.round(x * 16)); // Clamped between -8deg and +8deg
  };

  const handleCatwalkMouseLeave = () => {
    setCatwalkTilt(0);
  };

  return (
    <section className="relative w-full bg-[#f4f3f0] text-[#151412] pt-8 pb-16 overflow-hidden select-none border-b border-[#e3e0da]">
      
      {/* Top Bar / Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] sm:text-[11px] font-manrope font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#77736c]">
                Live Runway · Fall '26
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#151412]"></span>
              <span className="text-[10px] sm:text-[11px] font-manrope text-[#77736c]">New York Fashion Week</span>
            </div>
            
            <h1 className="font-instrument text-2xl sm:text-4xl lg:text-6xl font-normal text-[#151412] tracking-tight">
              The Runway <span className="italic font-normal font-serif text-[#77736c]">Catwalk</span> — {activeGender === 'women' ? 'Women' : 'Men'}
            </h1>
            
            <p className="font-manrope text-xs sm:text-sm text-[#77736c] font-light mt-1">
              Models advance down the central runway in real-time. Tap any model along the ramp to bring them forward.
            </p>
          </div>

          {/* Controls: Live Show Toggle + Women / Men Toggle Tabs */}
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            
            {/* Auto Runway Show Toggle Button */}
            <button
              onClick={() => setIsAutoRunwayPlaying(!isAutoRunwayPlaying)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-manrope font-semibold border transition-all shadow-xs ${
                isAutoRunwayPlaying
                  ? 'bg-[#151412] text-white border-[#151412]'
                  : 'bg-white text-[#151412] border-[#e3e0da] hover:border-[#151412]'
              }`}
            >
              {isAutoRunwayPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#b89562]" />
                  <span>Pause Ramp Show</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#151412]" />
                  <span>Auto Ramp Show</span>
                </>
              )}
            </button>

            {/* Women / Men Switcher */}
            <div className="inline-flex items-center gap-5 bg-white px-4 py-2 rounded-full border border-[#e3e0da] shadow-xs">
              <button
                onClick={() => onGenderChange('women')}
                className={`relative pb-0.5 text-xs font-manrope font-semibold tracking-wider uppercase transition-colors ${
                  activeGender === 'women' ? 'text-[#151412]' : 'text-[#77736c] hover:text-[#151412]'
                }`}
              >
                Women
                {activeGender === 'women' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#151412] rounded-full animate-fade-in" />
                )}
              </button>
              <span className="text-[#e3e0da] text-xs">/</span>
              <button
                onClick={() => onGenderChange('men')}
                className={`relative pb-0.5 text-xs font-manrope font-semibold tracking-wider uppercase transition-colors ${
                  activeGender === 'men' ? 'text-[#151412]' : 'text-[#77736c] hover:text-[#151412]'
                }`}
              >
                Men
                {activeGender === 'men' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#151412] rounded-full animate-fade-in" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stage Grid: Left 72% 3D Fashion Runway Ramp | Right 28% "In This Look" Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* THE 3D RUNWAY CATWALK RAMP STAGE (8 COLS) */}
          <div className="lg:col-span-8 relative">
            <div
              className={`relative w-full h-[450px] sm:h-[600px] lg:h-[700px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#ebe7df] via-[#e5e0d6] to-[#d8d2c5] border border-[#dedad2] overflow-hidden shadow-[0_25px_60px_rgba(21,20,18,0.08)] transition-opacity duration-300 ${
                isGenderTransitioning ? 'opacity-30' : 'opacity-100'
              }`}
              onMouseMove={handleCatwalkMouseMove}
              onMouseLeave={handleCatwalkMouseLeave}
              style={{
                perspective: '1400px',
              }}
            >
              {/* Backstage Arch & Distant Horizon Portal */}
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#d5cebf] to-transparent pointer-events-none z-0" />
              <div
                className="absolute top-6 left-[8%] w-36 h-48 rounded-t-full bg-gradient-to-b from-white/90 to-transparent border-t-2 border-x-2 border-white/60 blur-xs pointer-events-none"
                style={{ opacity: 0.65 }}
              />

              {/* 3D PERSPECTIVE CATWALK RAMP RUNNER */}
              {/* This is the physical elevated fashion ramp extending forward */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
                style={{
                  height: '75%',
                  perspective: '900px',
                }}
              >
                {/* The Catwalk Runway Floor (Trapezoid Perspective Strip) */}
                <div
                  className="w-full h-full relative"
                  style={{
                    transform: 'rotateX(55deg)',
                    transformOrigin: 'bottom center',
                    background: 'linear-gradient(to bottom, #d2cbbe 0%, #ded7cc 30%, #eee9e0 70%, #faf8f5 100%)',
                    boxShadow: '0 -15px 30px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Runway Left & Right Glowing LED Track Lights */}
                  <div className="absolute top-0 bottom-0 left-[6%] w-1 bg-gradient-to-b from-[#b89562]/20 via-[#b89562] to-[#b89562] shadow-[0_0_12px_#b89562]" />
                  <div className="absolute top-0 bottom-0 right-[6%] w-1 bg-gradient-to-b from-[#b89562]/20 via-[#b89562] to-[#b89562] shadow-[0_0_12px_#b89562]" />

                  {/* Runway Runner Strip Center Dashes */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-[#b89562]/40 to-[#b89562]/60" />

                  {/* Surface High-Gloss Runway Reflection Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-black/5" />
                </div>
              </div>

              {/* Foreground Spotlight Pool (Where Front Model Stands) */}
              <div
                className="absolute bottom-2 right-[6%] w-64 sm:w-[420px] h-28 sm:h-[190px] rounded-full pointer-events-none z-15"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 45%, transparent 75%)',
                  filter: 'blur(18px)',
                }}
              />

              {/* Live Runway Show Status at Top */}
              <div className="absolute top-4 inset-x-4 z-40 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e3e0da] shadow-sm pointer-events-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] font-manrope font-bold text-[#151412]">
                    LIVE RAMP: {frontLook.title}
                  </span>
                  <span className="text-[10px] text-[#77736c] font-manrope">
                    ({frontLook.number})
                  </span>
                </div>
              </div>

              {/* Hardware-Accelerated Smooth Runway Countdown Progress Line (0% CPU, Silky Smooth) */}
              {isAutoRunwayPlaying && (
                <div className="absolute top-0 inset-x-0 h-1 bg-black/5 z-50 overflow-hidden pointer-events-none">
                  <div
                    key={`${frontLook.id}-${activeGender}`}
                    className="h-full bg-[#151412] animate-runway-progress origin-left"
                  />
                </div>
              )}

              {/* 6 MODELS ADVANCING DOWN THE PERSPECTIVE CATWALK RAMP */}
              {order.map((lookIndex, slotIndex) => {
                const look = looks[lookIndex];
                if (!look) return null;
                const slot = RAMP_SLOTS[slotIndex] || RAMP_SLOTS[5];
                const isFront = slotIndex === 0;
                const isHoveredWaiting = hoveredWaitingIndex === slotIndex && !isFront;

                // Color image for this look
                const lookColorIdx = selectedColorIndex[look.id] || 0;
                const modelImg = isFront && activeColor
                  ? activeColor.image
                  : (look.colors[lookColorIdx]?.image || look.colors[0].image);

                return (
                  <div
                    key={`${look.id}-${activeGender}`}
                    onClick={() => handleSelectSlot(slotIndex)}
                    onMouseEnter={() => !isFront && setHoveredWaitingIndex(slotIndex)}
                    onMouseLeave={() => setHoveredWaitingIndex(null)}
                    className="absolute flex flex-col items-center select-none cursor-pointer group"
                    style={{
                      left: `${slot.left}%`,
                      bottom: `${slot.bottom}px`,
                      transform: `translateX(-50%) scale(${isHoveredWaiting ? slot.scale * 1.08 : slot.scale}) translateY(${
                        isHoveredWaiting ? '-14px' : '0'
                      })`,
                      zIndex: isFront ? 35 : (isHoveredWaiting ? 32 : slot.zIndex),
                      filter: isHoveredWaiting ? 'blur(0px)' : `blur(${slot.blur}px)`,
                      opacity: isHoveredWaiting ? 1 : slot.opacity,
                      transition: 'all 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
                    }}
                  >
                    {/* Hover Pill Tag for Waiting Models */}
                    {isHoveredWaiting && (
                      <div className="absolute -top-10 z-50 animate-fade-in pointer-events-none whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151412] text-white text-[11px] font-manrope font-medium shadow-xl">
                          <span>{look.title}</span>
                          <span className="text-[#b89562]">·</span>
                          <span className="font-semibold">₹{look.totalPrice}</span>
                        </span>
                      </div>
                    )}

                    {/* Front Model Float Container (natural breathing float) */}
                    <div
                      className={`relative flex flex-col items-center ${
                        isFront ? 'animate-float' : ''
                      }`}
                      style={{
                        perspective: '1200px',
                      }}
                    >
                      {/* Model Image Cutout (PURE TRANSPARENT - ZERO CARD RECTANGLE) */}
                      <div
                        className={`relative transition-all duration-300 ${
                          isCrossFadingColor && isFront ? 'blur-md opacity-40 scale-[0.98]' : 'blur-0 opacity-100'
                        }`}
                        style={{
                          transform: isFront
                            ? `rotateY(${catwalkTilt}deg)`
                            : 'none',
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.25s ease-out, filter 0.3s ease, opacity 0.3s ease',
                        }}
                      >
                        <img
                          src={modelImg}
                          alt={look.title}
                          className={`h-[330px] sm:h-[480px] lg:h-[600px] max-w-[85vw] w-auto object-contain object-bottom pointer-events-none filter drop-shadow-[0_20px_30px_rgba(21,20,18,0.18)] ${
                            isFront ? 'brightness-[1.02]' : 'brightness-[0.96]'
                          }`}
                          loading="eager"
                        />

                        {/* Front Model Hover Action Cue */}
                        {isFront && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 rounded-3xl pointer-events-none">
                            <span className="px-4 py-2 bg-[#151412]/90 text-white text-xs font-manrope tracking-wider uppercase rounded-full backdrop-blur-md shadow-2xl flex items-center gap-2">
                              <Eye className="w-3.5 h-3.5 text-[#b89562]" />
                              <span>View Look Details</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Realistic Runway Floor Reflection under the model */}
                      <div
                        className="w-48 h-8 -mt-2 overflow-hidden opacity-20 pointer-events-none transform scale-y-[-1] filter blur-[1px]"
                        style={{
                          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        }}
                      >
                        <img
                          src={modelImg}
                          alt=""
                          className="h-[200px] w-auto object-contain object-bottom mx-auto"
                        />
                      </div>

                      {/* Oval Runway Floor Contact Shadow */}
                      <div
                        className={`rounded-full bg-[#151412]/25 blur-md transition-all duration-700 -mt-6 ${
                          isFront
                            ? 'w-52 h-5 bg-[#151412]/30 blur-lg shadow-lg'
                            : 'w-28 h-3 bg-[#151412]/15 blur-sm'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* THREE-COLUMN BOTTOM BAR UNDER THE RUNWAY CATWALK */}
            <div className="mt-4 sm:mt-5 flex flex-col md:grid md:grid-cols-12 gap-3 sm:gap-4 items-stretch md:items-center bg-white/95 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl border border-[#e3e0da] shadow-sm">
              
              {/* Left Column: Look Name & 01/06 Segment Progress */}
              <div className="md:col-span-4 flex items-center justify-between md:flex-col md:items-start gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-instrument text-2xl font-normal text-[#151412] line-clamp-1">
                    {frontLook.title}
                  </span>
                  <span className="font-manrope text-xs font-bold text-[#77736c] tracking-wider">
                    {frontLook.number}
                  </span>
                </div>

                {/* 6 Ramp Progress Segments */}
                <div className="flex items-center gap-1.5 w-44">
                  {looks.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSlot(idx)}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        idx === frontLookIndex
                          ? 'bg-[#151412] scale-y-125 shadow-xs'
                          : 'bg-[#e3e0da] hover:bg-[#77736c]'
                      }`}
                      title={`Jump to Ramp Look 0${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Centre Column: Colour Swatches + Solid Black 'Shop The Look' */}
              <div className="md:col-span-5 flex items-center justify-between md:justify-center gap-2 sm:gap-3">
                
                {/* Colour Variant Pill */}
                <div className="inline-flex items-center gap-2.5 bg-[#f4f3f0] px-3.5 py-1.5 rounded-full border border-[#e3e0da]">
                  <span className="text-[11px] font-manrope font-medium text-[#77736c]">
                    {activeColor.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {frontLook.colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(i)}
                        className={`w-4 h-4 rounded-full border transition-all ${
                          i === activeColorIdx
                            ? 'ring-2 ring-[#151412] ring-offset-2 ring-offset-[#f4f3f0] scale-110'
                            : 'border-black/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Primary Action Button: 'Shop the look' with White Price Chip */}
                <button
                  onClick={() => onOpenLook(frontLook)}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#151412] hover:bg-black text-white font-manrope text-xs font-semibold tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95 group"
                >
                  <span>Shop the look</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-[#151412] text-[11px] font-bold">
                    ₹{frontLook.totalPrice}
                  </span>
                </button>
              </div>

              {/* Right Column: Next / Prev Arrow Buttons */}
              <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#e3e0da]">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-[#151412] flex items-center justify-center text-[#151412] hover:bg-[#151412] hover:text-white transition-all active:scale-90 shadow-xs"
                  aria-label="Previous Ramp Model"
                  title="Previous Ramp Look"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-[#151412] flex items-center justify-center text-[#151412] hover:bg-[#151412] hover:text-white transition-all active:scale-90 shadow-xs"
                  aria-label="Next Ramp Model"
                  title="Next Ramp Look"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT PANEL: "IN THIS LOOK" (4 COLS) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-[#e3e0da] shadow-[0_15px_40px_rgba(21,20,18,0.04)]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e3e0da]">
              <div>
                <span className="text-[10px] font-manrope font-semibold tracking-[0.2em] uppercase text-[#b89562]">
                  Runway Ensemble
                </span>
                <h3 className="font-instrument text-2xl font-normal text-[#151412]">
                  In This Look
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#f4f3f0] text-xs font-manrope font-semibold text-[#151412] border border-[#e3e0da]">
                {frontLook.pieces.length} Pieces
              </span>
            </div>

            {/* Individual Piece Cards */}
            <div className="space-y-3.5">
              {frontLook.pieces.map((piece, idx) => {
                const isWishlisted = wishlistIds.includes(piece.id);
                return (
                  <div
                    key={`${piece.id}-${idx}`}
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#f9f8f6] hover:bg-white border border-[#e3e0da] transition-all duration-300 group shadow-xs hover:shadow-md"
                  >
                    {/* Square Product Photo Tile */}
                    <div
                      onClick={() => onOpenLook(frontLook)}
                      className="relative w-20 h-20 rounded-xl bg-[#d4d3d0]/30 border border-[#e3e0da] overflow-hidden flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={piece.image}
                        alt={piece.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Frosted Heart Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(piece.id);
                        }}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                        title={isWishlisted ? 'Saved' : 'Save to Wishlist'}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#151412]'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Piece Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-manrope font-semibold tracking-wider uppercase text-[#77736c] block">
                        {piece.category}
                      </span>
                      <h4
                        onClick={() => onOpenLook(frontLook)}
                        className="font-manrope text-xs font-semibold text-[#151412] truncate cursor-pointer hover:text-[#77736c] transition-colors"
                      >
                        {piece.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-manrope text-[#77736c]">
                          {piece.color}
                        </span>
                        <span className="text-[#e3e0da] text-xs">·</span>
                        <span className="font-manrope text-xs font-bold text-[#151412]">
                          ₹{piece.price}
                        </span>
                      </div>
                    </div>

                    {/* Round Outlined + Button that rotates 90° on hover */}
                    <button
                      onClick={() => onAddToCart(piece, frontLook)}
                      className="w-9 h-9 rounded-full border border-[#151412] flex items-center justify-center text-[#151412] hover:bg-[#151412] hover:text-white transition-all duration-300 active:scale-90 group/btn flex-shrink-0"
                      title="Quick add to bag (Size M)"
                      aria-label="Add to bag"
                    >
                      <Plus className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-90" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick Helper Note & Total Summary */}
            <div className="mt-5 pt-4 border-t border-[#e3e0da] flex items-center justify-between text-xs font-manrope text-[#77736c]">
              <span>Complimentary express shipping</span>
              <button
                onClick={() => onOpenLook(frontLook)}
                className="font-semibold text-[#151412] hover:underline"
              >
                Customize Sizes & Fit →
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
