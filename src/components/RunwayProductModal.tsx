import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ArrowLeft,
  RotateCw,
  Play,
  Pause,
  Check,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Heart
} from 'lucide-react';
import { RunwayLook, RunwayPiece } from '../types';
import { RUNWAY_LOOKS_WOMEN, RUNWAY_LOOKS_MEN } from '../data/runwayData';

interface RunwayProductModalProps {
  look: RunwayLook | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCartBatch: (pieces: { piece: RunwayPiece; size: string; color: string }[]) => void;
  onToggleWishlist: (pieceId: string) => void;
  wishlistIds: string[];
  onSelectAnotherLook: (look: RunwayLook) => void;
}

export const RunwayProductModal: React.FC<RunwayProductModalProps> = ({
  look,
  isOpen,
  onClose,
  onAddToCartBatch,
  onToggleWishlist,
  wishlistIds,
  onSelectAnotherLook,
}) => {
  if (!isOpen || !look) return null;

  const otherLooks = (look.gender === 'women' ? RUNWAY_LOOKS_WOMEN : RUNWAY_LOOKS_MEN).filter(
    (l) => l.id !== look.id
  );

  // Active colour selection
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const activeColor = look.colors[selectedColorIdx] || look.colors[0];

  // Gallery view mode: '360' | 'model' | 'piece-0' | 'piece-1' ...
  const [activeGalleryView, setActiveGalleryView] = useState<string>('360');

  // 360 Turntable state
  const [turntableAngle, setTurntableAngle] = useState<number>(0);
  const [isTurntablePlaying, setIsTurntablePlaying] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragAngleStartRef = useRef<number>(0);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Piece selections: which pieces are included in the bundle
  const [includedPieceIds, setIncludedPieceIds] = useState<{ [id: string]: boolean }>(() => {
    const init: { [id: string]: boolean } = {};
    look.pieces.forEach((p) => {
      init[p.id] = true;
    });
    return init;
  });

  // Selected sizes for each piece
  const [selectedSizes, setSelectedSizes] = useState<{ [id: string]: string }>({});
  // Size validation errors (card shakes, red border, "Choose a size")
  const [sizeErrors, setSizeErrors] = useState<{ [id: string]: boolean }>({});

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');

  // Reserve in Store expansion
  const [isReserveOpen, setIsReserveOpen] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<string>('SoHo New York');
  const [selectedDay, setSelectedDay] = useState<'Today' | 'Tomorrow'>('Today');
  const [reserveName, setReserveName] = useState<string>('');
  const [reserveEmail, setReserveEmail] = useState<string>('');
  const [isReservedSuccess, setIsReservedSuccess] = useState<boolean>(false);

  // Reset states on look change
  useEffect(() => {
    setSelectedColorIdx(0);
    setActiveGalleryView(look.hasTurntable ? '360' : 'model');
    const initPieces: { [id: string]: boolean } = {};
    look.pieces.forEach((p) => {
      initPieces[p.id] = true;
    });
    setIncludedPieceIds(initPieces);
    setSelectedSizes({});
    setSizeErrors({});
    setIsReserveOpen(false);
    setIsReservedSuccess(false);
  }, [look.id]);

  // 360 Auto spin animation
  useEffect(() => {
    let frameId: number;
    if (activeGalleryView === '360' && isTurntablePlaying && !isDragging) {
      const step = () => {
        setTurntableAngle((prev) => (prev + 1.2) % 360);
        frameId = requestAnimationFrame(step);
      };
      frameId = requestAnimationFrame(step);
    }
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [activeGalleryView, isTurntablePlaying, isDragging]);

  // Turntable drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeGalleryView !== '360') return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragAngleStartRef.current = turntableAngle;
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartXRef.current;
    setTurntableAngle((dragAngleStartRef.current + delta * 0.9 + 3600) % 360);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setTimeout(() => {
      setIsTurntablePlaying(true);
    }, 2500);
  };

  // Toggle piece inclusion
  const togglePieceIncluded = (pieceId: string) => {
    setIncludedPieceIds((prev) => ({
      ...prev,
      [pieceId]: !prev[pieceId],
    }));
    // Clear error if excluded
    setSizeErrors((prev) => ({ ...prev, [pieceId]: false }));
  };

  // Select size for a piece
  const handleSelectSize = (pieceId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [pieceId]: size }));
    setSizeErrors((prev) => ({ ...prev, [pieceId]: false }));
  };

  // Calculate live total price of included pieces
  const includedPieces = look.pieces.filter((p) => includedPieceIds[p.id]);
  const liveTotal = includedPieces.reduce((sum, p) => sum + p.price, 0);

  // Add to Bag action with validation
  const handleAddAllToBag = () => {
    const errors: { [id: string]: boolean } = {};
    let hasError = false;

    includedPieces.forEach((piece) => {
      if (!selectedSizes[piece.id]) {
        errors[piece.id] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setSizeErrors(errors);
      return;
    }

    const batch = includedPieces.map((p) => ({
      piece: p,
      size: selectedSizes[p.id] || 'M',
      color: activeColor.name,
    }));

    onAddToCartBatch(batch);
  };

  // Reserve submission
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveName || !reserveEmail) return;
    setIsReservedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-12 flex items-center justify-center">
        
        {/* Main Card */}
        <div className="relative w-full max-w-6xl bg-[#f4f3f0] text-[#151412] rounded-3xl border border-[#e3e0da] shadow-2xl overflow-hidden my-6">
          
          {/* Top Breadcrumb & Close Bar */}
          <div className="sticky top-0 z-40 bg-[#f4f3f0]/95 backdrop-blur-md px-6 py-4 border-b border-[#e3e0da] flex items-center justify-between">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-manrope font-semibold text-[#151412] hover:text-[#77736c] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to the lineup</span>
              <span className="text-[#e3e0da] hidden sm:inline">/</span>
              <span className="text-[#77736c] font-normal hidden sm:inline">
                {look.gender === 'women' ? 'Women' : 'Men'} / Fall '26 / Look {look.number.split('/')[0].trim()}
              </span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[#e3e0da] bg-white flex items-center justify-center text-[#151412] hover:bg-[#151412] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body: Left Gallery (Sticky) | Right Look Details */}
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* LEFT COLUMN: GALLERY WITH 360 TURNTABLE & HERO (6 COLS) */}
              <div className="lg:col-span-6 flex gap-4 lg:sticky lg:top-24">
                
                {/* Vertical Thumbnails */}
                <div className="flex flex-col gap-2.5 flex-shrink-0">
                  {/* 360 view thumbnail */}
                  <button
                    onClick={() => setActiveGalleryView('360')}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden border transition-all ${
                      activeGalleryView === '360'
                        ? 'ring-2 ring-[#151412] border-transparent'
                        : 'border-[#e3e0da] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={activeColor.image}
                      alt="360 view"
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute bottom-1 inset-x-1 py-0.5 rounded-sm bg-[#151412] text-white text-[8px] font-bold tracking-wider text-center flex items-center justify-center gap-0.5">
                      <RotateCw className="w-2.5 h-2.5" /> 360°
                    </span>
                  </button>

                  {/* Still model view thumbnail */}
                  <button
                    onClick={() => setActiveGalleryView('model')}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden border transition-all ${
                      activeGalleryView === 'model'
                        ? 'ring-2 ring-[#151412] border-transparent'
                        : 'border-[#e3e0da] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={activeColor.image}
                      alt="Model look"
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute bottom-1 inset-x-1 py-0.5 rounded-sm bg-white/80 backdrop-blur-xs text-[#151412] text-[8px] font-semibold text-center">
                      Model
                    </span>
                  </button>

                  {/* Individual Piece Thumbnails */}
                  {look.pieces.map((piece, i) => (
                    <button
                      key={piece.id}
                      onClick={() => setActiveGalleryView(`piece-${i}`)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border transition-all ${
                        activeGalleryView === `piece-${i}`
                          ? 'ring-2 ring-[#151412] border-transparent'
                          : 'border-[#e3e0da] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={piece.image}
                        alt={piece.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <span className="absolute bottom-1 inset-x-1 py-0.5 rounded-sm bg-white/80 backdrop-blur-xs text-[#151412] text-[8px] font-semibold text-center truncate px-0.5">
                        Piece {i + 1}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Hero 4:5 Display Stage */}
                <div
                  className="relative flex-1 h-[480px] sm:h-[580px] rounded-2xl bg-gradient-to-b from-[#f9f8f6] to-[#eae8e3] border border-[#e3e0da] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* Spotlight on floor */}
                  <div className="absolute bottom-4 w-64 h-24 rounded-full bg-white/80 blur-xl pointer-events-none" />

                  {activeGalleryView === '360' ? (
                    // 360 Turntable View
                    <div className="relative flex flex-col items-center justify-center w-full h-full">
                      {/* Hint Pill top */}
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#e3e0da] text-[10px] font-manrope text-[#77736c]">
                        <RotateCw className="w-3 h-3 text-[#151412]" />
                        <span>Drag horizontally to turn 360°</span>
                      </div>

                      {/* Play/Pause Pill corner */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsTurntablePlaying(!isTurntablePlaying);
                        }}
                        className="absolute bottom-4 right-4 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#e3e0da] text-xs font-manrope font-semibold text-[#151412] shadow-sm hover:bg-white"
                      >
                        {isTurntablePlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-[#151412]" />
                            <span>Turn</span>
                          </>
                        )}
                      </button>

                      {/* Rotating Turntable Model Image */}
                      <div
                        className="relative"
                        style={{
                          perspective: '1200px',
                        }}
                      >
                        <div
                          style={{
                            transform: `rotateY(${turntableAngle}deg)`,
                            transformStyle: 'preserve-3d',
                            transition: isDragging ? 'none' : 'transform 0.08s linear',
                          }}
                        >
                          <img
                            src={activeColor.image}
                            alt={look.title}
                            className="max-h-[460px] sm:max-h-[520px] w-auto object-contain filter drop-shadow-[0_20px_30px_rgba(21,20,18,0.18)]"
                          />
                        </div>

                        {/* Floating shadow */}
                        <div className="mt-2 w-48 h-4 rounded-full bg-[#151412]/20 blur-md mx-auto" />
                      </div>
                    </div>
                  ) : activeGalleryView === 'model' ? (
                    // Still Model Float
                    <div className="relative flex flex-col items-center justify-center animate-float">
                      <img
                        src={activeColor.image}
                        alt={look.title}
                        className="max-h-[460px] sm:max-h-[520px] w-auto object-contain filter drop-shadow-[0_20px_30px_rgba(21,20,18,0.16)]"
                      />
                      <div className="mt-2 w-48 h-4 rounded-full bg-[#151412]/20 blur-md" />
                    </div>
                  ) : (
                    // Piece Shot
                    <div className="relative w-full h-full p-8 flex items-center justify-center">
                      {(() => {
                        const pieceIdx = parseInt(activeGalleryView.split('-')[1]);
                        const piece = look.pieces[pieceIdx] || look.pieces[0];
                        return (
                          <div className="text-center">
                            <img
                              src={piece.image}
                              alt={piece.name}
                              className="max-h-[380px] w-auto mx-auto object-contain rounded-2xl shadow-lg"
                            />
                            <div className="mt-4">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-[#77736c]">
                                {piece.category}
                              </span>
                              <h4 className="font-manrope text-sm font-semibold text-[#151412]">
                                {piece.name}
                              </h4>
                              <p className="text-xs font-bold text-[#151412] mt-0.5">
                                ₹{piece.price}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: LOOK INFO, PIECES CHECKLIST & ACCORDIONS (6 COLS) */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Header Kicker & Title */}
                <div>
                  <span className="text-[11px] font-manrope font-bold tracking-[0.2em] uppercase text-[#77736c]">
                    Look {look.number.split('/')[0].trim()}, {look.gender === 'women' ? 'Women' : 'Men'}
                  </span>
                  
                  <h2 className="font-instrument text-3xl sm:text-4xl text-[#151412] mt-1 font-normal tracking-tight">
                    {look.title}
                  </h2>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xl font-manrope font-bold text-[#151412]">
                      ₹{liveTotal}
                    </span>
                    <span className="text-xs font-manrope text-[#77736c]">
                      {includedPieces.length} of {look.pieces.length} pieces selected
                    </span>
                  </div>

                  <p className="font-manrope text-xs sm:text-sm text-[#77736c] font-light mt-3 leading-relaxed">
                    {look.description}
                  </p>
                </div>

                {/* Colour Variant Circles */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#e3e0da]">
                  <div className="flex items-center justify-between text-xs font-manrope mb-2">
                    <span className="text-[#77736c]">Selected Colourway:</span>
                    <span className="font-semibold text-[#151412]">{activeColor.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {look.colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColorIdx(i)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-manrope transition-all ${
                          i === selectedColorIdx
                            ? 'border-[#151412] bg-[#f4f3f0] font-semibold text-[#151412] shadow-sm'
                            : 'border-[#e3e0da] text-[#77736c] hover:border-[#151412]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* "PIECES IN THIS LOOK" CHECKLIST CARDS */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-manrope text-xs font-bold uppercase tracking-wider text-[#151412]">
                      Pieces In This Look
                    </h3>
                    <span className="text-[11px] text-[#77736c]">
                      Uncheck any item you don't wish to purchase
                    </span>
                  </div>

                  <div className="space-y-3">
                    {look.pieces.map((piece) => {
                      const isIncluded = Boolean(includedPieceIds[piece.id]);
                      const currentSize = selectedSizes[piece.id];
                      const hasError = Boolean(sizeErrors[piece.id]);
                      const isWishlisted = wishlistIds.includes(piece.id);

                      return (
                        <div
                          key={piece.id}
                          className={`p-4 rounded-2xl border transition-all duration-300 ${
                            hasError
                              ? 'border-red-500 bg-red-50/40 animate-pulse'
                              : isIncluded
                              ? 'bg-white border-[#e3e0da] shadow-sm'
                              : 'bg-white/40 border-[#e3e0da] opacity-60'
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            {/* Checkbox */}
                            <button
                              onClick={() => togglePieceIncluded(piece.id)}
                              className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center transition-colors ${
                                isIncluded
                                  ? 'bg-[#151412] border-[#151412] text-white'
                                  : 'border-[#77736c] hover:border-[#151412]'
                              }`}
                              aria-label={isIncluded ? 'Exclude Piece' : 'Include Piece'}
                            >
                              {isIncluded && <Check className="w-3 h-3" />}
                            </button>

                            {/* Piece Thumbnail */}
                            <img
                              src={piece.image}
                              alt={piece.name}
                              className="w-16 h-16 rounded-xl object-cover border border-[#e3e0da]"
                            />

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="font-manrope text-xs font-semibold text-[#151412]">
                                    {piece.name}
                                  </h4>
                                  <span className="text-[11px] text-[#77736c] font-manrope">
                                    {activeColor.name} · ₹{piece.price}
                                  </span>
                                </div>
                                <button
                                  onClick={() => onToggleWishlist(piece.id)}
                                  className="text-[#77736c] hover:text-red-500 transition-colors p-1"
                                  title="Save to Wishlist"
                                >
                                  <Heart
                                    className={`w-3.5 h-3.5 ${
                                      isWishlisted ? 'fill-red-500 text-red-500' : ''
                                    }`}
                                  />
                                </button>
                              </div>

                              {/* Size Selector Pills */}
                              {isIncluded && (
                                <div className="mt-2.5">
                                  <div className="flex items-center justify-between text-[11px] mb-1">
                                    <span className="text-[#77736c]">Size:</span>
                                    {hasError && (
                                      <span className="text-red-600 font-semibold font-manrope animate-bounce">
                                        Choose a size
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex flex-wrap gap-1.5">
                                    {piece.sizes.map((sz) => (
                                      <button
                                        key={sz}
                                        onClick={() => handleSelectSize(piece.id, sz)}
                                        className={`px-2.5 py-1 rounded-full text-[11px] font-manrope font-semibold border transition-all ${
                                          currentSize === sz
                                            ? 'bg-[#151412] text-white border-[#151412]'
                                            : 'border-[#e3e0da] text-[#151412] hover:border-[#151412] bg-[#f9f8f6]'
                                        }`}
                                      >
                                        {sz}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Action Buttons: Add to Bag & Reserve in Store */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleAddAllToBag}
                    disabled={includedPieces.length === 0}
                    className="w-full py-4 px-6 rounded-full bg-[#151412] hover:bg-black text-white font-manrope text-sm font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <span>Add {includedPieces.length} Pieces to Bag</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-[#151412] text-xs font-bold">
                      ₹{liveTotal}
                    </span>
                  </button>

                  <button
                    onClick={() => setIsReserveOpen(!isReserveOpen)}
                    className="w-full py-3 px-6 rounded-full border border-[#151412] hover:bg-[#151412] hover:text-white text-[#151412] font-manrope text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Reserve for me in store</span>
                  </button>
                </div>

                {/* In-Store Reservation Expandable Panel */}
                {isReserveOpen && (
                  <div className="p-5 rounded-2xl bg-white border border-[#e3e0da] shadow-sm animate-fade-in space-y-4">
                    {isReservedSuccess ? (
                      <div className="text-center py-4 space-y-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="font-instrument text-xl text-[#151412]">
                          Look Reserved for 48 Hours
                        </h4>
                        <p className="text-xs text-[#77736c] max-w-sm mx-auto font-manrope">
                          We have set aside your pieces at <strong className="text-[#151412]">{selectedStore}</strong> for <strong className="text-[#151412]">{selectedDay}</strong>. A confirmation has been sent to {reserveEmail}.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleConfirmReservation} className="space-y-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#77736c] block">
                          Select Boutique Location
                        </span>
                        
                        <div className="flex flex-wrap gap-2">
                          {['SoHo New York', 'Melrose Los Angeles', 'Fulton Market Chicago'].map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => setSelectedStore(st)}
                              className={`px-3 py-1.5 rounded-full text-xs font-manrope transition-all border ${
                                selectedStore === st
                                  ? 'bg-[#151412] text-white border-[#151412]'
                                  : 'border-[#e3e0da] text-[#151412] hover:border-[#151412]'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-xs text-[#77736c]">Fitting Day:</span>
                          {(['Today', 'Tomorrow'] as const).map((day) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => setSelectedDay(day)}
                              className={`px-3 py-1 rounded-full text-xs font-manrope border ${
                                selectedDay === day
                                  ? 'bg-[#151412] text-white border-[#151412]'
                                  : 'border-[#e3e0da] text-[#151412]'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <input
                            type="text"
                            required
                            placeholder="Your Full Name"
                            value={reserveName}
                            onChange={(e) => setReserveName(e.target.value)}
                            className="px-3 py-2 rounded-xl border border-[#e3e0da] text-xs font-manrope focus:outline-none focus:ring-1 focus:ring-[#151412]"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={reserveEmail}
                            onChange={(e) => setReserveEmail(e.target.value)}
                            className="px-3 py-2 rounded-xl border border-[#e3e0da] text-xs font-manrope focus:outline-none focus:ring-1 focus:ring-[#151412]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-full bg-[#151412] hover:bg-black text-white text-xs font-manrope font-semibold tracking-wider uppercase transition-all"
                        >
                          Reserve Free for 48 Hours
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* Guarantees & Shipping icons */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-manrope text-[#77736c] border-t border-[#e3e0da]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#151412]" />
                    <span>Free express shipping on ₹1,999+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-[#151412]" />
                    <span>Complimentary 30-day returns</span>
                  </div>
                </div>

                {/* Accordions */}
                <div className="space-y-2 pt-2 border-t border-[#e3e0da]">
                  {/* Fabric & Care */}
                  <div className="border border-[#e3e0da] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === 'fabric' ? null : 'fabric')}
                      className="w-full px-4 py-3 text-left font-manrope text-xs font-semibold text-[#151412] flex items-center justify-between"
                    >
                      <span>Fabric & Care</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openAccordion === 'fabric' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openAccordion === 'fabric' && (
                      <div className="px-4 pb-3 text-xs font-manrope text-[#77736c] leading-relaxed border-t border-[#e3e0da]/60 pt-2 animate-fade-in">
                        {look.fabricCare}
                      </div>
                    )}
                  </div>

                  {/* Size & Fit */}
                  <div className="border border-[#e3e0da] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === 'fit' ? null : 'fit')}
                      className="w-full px-4 py-3 text-left font-manrope text-xs font-semibold text-[#151412] flex items-center justify-between"
                    >
                      <span>Size & Fit Guide</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openAccordion === 'fit' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openAccordion === 'fit' && (
                      <div className="px-4 pb-3 text-xs font-manrope text-[#77736c] leading-relaxed border-t border-[#e3e0da]/60 pt-2 animate-fade-in">
                        {look.sizeFit}
                      </div>
                    )}
                  </div>

                  {/* Shipping & Returns */}
                  <div className="border border-[#e3e0da] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                      className="w-full px-4 py-3 text-left font-manrope text-xs font-semibold text-[#151412] flex items-center justify-between"
                    >
                      <span>Shipping & Returns</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openAccordion === 'shipping' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openAccordion === 'shipping' && (
                      <div className="px-4 pb-3 text-xs font-manrope text-[#77736c] leading-relaxed border-t border-[#e3e0da]/60 pt-2 animate-fade-in">
                        {look.shippingReturns}
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* "YOU MAY ALSO LIKE" HORIZONTAL SCROLL RAIL */}
            <div className="mt-14 pt-8 border-t border-[#e3e0da]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-manrope font-semibold tracking-[0.2em] uppercase text-[#77736c]">
                    Explore The Collection
                  </span>
                  <h3 className="font-instrument text-2xl font-normal text-[#151412]">
                    You May Also Like
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-5 overflow-x-auto pb-4 no-scrollbar">
                {otherLooks.map((other) => (
                  <div
                    key={other.id}
                    onClick={() => onSelectAnotherLook(other)}
                    className="w-56 flex-shrink-0 bg-white rounded-2xl p-3 border border-[#e3e0da] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="w-full h-64 rounded-xl bg-[#d4d3d0]/30 overflow-hidden relative flex items-center justify-center">
                      <img
                        src={other.colors[0].image}
                        alt={other.title}
                        className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
                      />
                    </div>
                    <div className="mt-3">
                      <span className="text-[10px] font-bold uppercase text-[#77736c]">
                        Look {other.number.split('/')[0].trim()}
                      </span>
                      <h4 className="font-manrope text-xs font-semibold text-[#151412] truncate group-hover:text-[#77736c] transition-colors">
                        {other.title}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold text-[#151412]">
                          ₹{other.totalPrice}
                        </span>
                        <div className="flex items-center gap-1">
                          {other.colors.map((c) => (
                            <span
                              key={c.name}
                              className="w-2.5 h-2.5 rounded-full border border-black/15"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
