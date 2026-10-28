import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCw,
  Play,
  Pause,
  ShoppingBag,
  Scissors,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { Product } from '../types';

interface Circular3DDeconstructProps {
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenTailoring: () => void;
  onSelectProductFor3D: (product: Product) => void;
  activeGender?: 'women' | 'men';
}

interface StudioOutfit {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  image: string;
  gender: 'women' | 'men';
  modelInfo: string;
  fabric: string;
  origin: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  highlights: string[];
  description: string;
}

const MEN_OUTFITS: StudioOutfit[] = [
  {
    id: 'studio-m-01',
    name: 'The Sand Dune Double-Breasted Suit',
    subtitle: 'Super 150s Loro Piana Wool with Full Floating Canvas',
    category: 'Suits & Tailoring',
    price: 980,
    image: '/images/cutout-men-1.png',
    gender: 'men',
    modelInfo: 'Julian (6\'1" · Wearing 40R / 32W)',
    fabric: '100% Super 150s Loro Piana Tasmanian Virgin Wool',
    origin: 'Biella, Northern Italy',
    colors: [
      { name: 'Sand Dune Tan', hex: '#D4C4AE' },
      { name: 'Desert Taupe', hex: '#B8A590' },
      { name: 'Charcoal Black', hex: '#21201E' },
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    highlights: [
      'Full floating horsehair canvas chest piece',
      'Hand-sewn milanese lapel buttonhole',
      'Natural water-buffalo horn buttons',
      'Hand-finished pick-stitched edges'
    ],
    description: 'A masterwork of Italian sartorial construction. Steamed over curved body forms for anatomical chest volume that breathes and drapes organically.'
  },
  {
    id: 'studio-m-02',
    name: 'Espresso Cashmere Overcoat & Rollneck',
    subtitle: '520 GSM Mongolian Cashmere with Unconstructed Shoulders',
    category: 'Coats & Outerwear',
    price: 1120,
    image: '/images/cutout-men-2.png',
    gender: 'men',
    modelInfo: 'Marcus (6\'2" · Wearing 42R)',
    fabric: '100% Grade-A Mongolian Cashmere (520 GSM)',
    origin: 'Inner Mongolia / Scotland Spun',
    colors: [
      { name: 'Espresso Roast', hex: '#3B2C24' },
      { name: 'Camel Tan', hex: '#B89264' },
      { name: 'Slate Grey', hex: '#4A4C50' },
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    highlights: [
      '520 GSM dense virgin cashmere',
      'Natural teasel ripple finish',
      'Unconstructed Neapolitan shoulders',
      'Full Bemberg cupro interior lining'
    ],
    description: 'Cut from heavyweight Inner Mongolian cashmere treated with natural dried thistle teasels for a rippled, weather-repelling sheen.'
  },
  {
    id: 'studio-m-03',
    name: 'Oatmeal Wool Polo Cardigan & Trousers',
    subtitle: 'Milano-Stitch Extra-Fine Australian Merino Wool',
    category: 'Fine Knitwear',
    price: 650,
    image: '/images/cutout-men-3.png',
    gender: 'men',
    modelInfo: 'Alexander (6\'0" · Wearing Size M)',
    fabric: '85% Australian Merino, 15% Mulberry Silk',
    origin: 'Melbourne / Milan Finishing',
    colors: [
      { name: 'Oatmeal Heather', hex: '#D7CDC1' },
      { name: 'Moss Green', hex: '#4A5B49' },
      { name: 'Charcoal Black', hex: '#1E1E1C' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    highlights: [
      'Gauge 14 double-knit Milano structure',
      'Genuine Australian shell buttons',
      'Seamless fully fashioned shoulder saddle',
      'Forward single-pleat wool trousers'
    ],
    description: 'Blurs the boundary between soft knitwear and jacket structure. Dense Milano knit preserves crisp lapels without sagging.'
  },
  {
    id: 'studio-m-04',
    name: 'Charcoal Covert Raglan Overcoat',
    subtitle: 'Yorkshire Covert Cloth with Clean Architectural Silhouette',
    category: 'Coats & Outerwear',
    price: 930,
    image: '/images/cutout-men-4.png',
    gender: 'men',
    modelInfo: 'Oliver (6\'2" · Wearing 40R)',
    fabric: '100% British Covert Wool (480 GSM)',
    origin: 'Yorkshire, England',
    colors: [
      { name: 'Charcoal Slate', hex: '#373A3E' },
      { name: 'Midnight Jet', hex: '#191A1C' },
      { name: 'Camel Tan', hex: '#B99368' },
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    highlights: [
      'Heavyweight 480 GSM English covert twill',
      'Concealed horn fly-front placket',
      'Split raglan sleeve for shoulder comfort',
      'Signature 4-row railway cuff stitching'
    ],
    description: 'An archival English covert coat engineered from dense, wind-defying twill. Features split-raglan sleeves providing total arm movement.'
  },
  {
    id: 'studio-m-05',
    name: 'Vitale Barberis Sartoriale Navy Suit',
    subtitle: 'Savile Row Two-Piece in Super 160s Vitale Barberis Wool',
    category: 'Suits & Tailoring',
    price: 1250,
    image: '/images/cutout-men-5.png',
    gender: 'men',
    modelInfo: 'Matteo (6\'1" · Wearing 40R / 32W)',
    fabric: '100% Super 160s Vitale Barberis Canonico Virgin Wool',
    origin: 'Pratrivero, Italy (Est. 1663)',
    colors: [
      { name: 'Bespoke Navy', hex: '#1C2938' },
      { name: 'Anthracite Charcoal', hex: '#2B2E33' },
      { name: 'Sand Beige', hex: '#D5C5B0' },
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    highlights: [
      '15.75 micron superfine Italian wool',
      'Hand-padded floating canvas with camel hair',
      'Conca roped shoulder for athletic silhouette',
      'Double-faced silk Bemberg lining'
    ],
    description: 'Cut from legendary 15.75 micron Vitale Barberis wool. The floating chest canvas shapes to your torso with every wear.'
  },
  {
    id: 'studio-m-06',
    name: 'Imperial Hand-Embroidered Raw Silk Sherwani',
    subtitle: 'Pure Banarasi Handloom Raw Silk with Real Gold Zardozi',
    category: 'Ceremonial & Wedding',
    price: 1680,
    image: '/images/cutout-men-6.png',
    gender: 'men',
    modelInfo: 'Kabir (6\'2" · Custom Bespoke Fit)',
    fabric: '100% Pure Banarasi Raw Silk & French Metallic Gold Bullion',
    origin: 'Varanasi, India',
    colors: [
      { name: 'Antique Gold Cream', hex: '#E2D1B2' },
      { name: 'Regal Ruby Red', hex: '#631B22' },
      { name: 'Midnight Royal Black', hex: '#1C1B1A' },
    ],
    sizes: ['38', '40', '42', '44', 'Custom Fit'],
    highlights: [
      '96 hours of hand zardozi bullion embroidery',
      'Hand-cast Kundan buttons with glass stones',
      'Handloom raw silk with organic slub texture',
      'Pure Mulberry silk lining for cool comfort'
    ],
    description: 'Ceremonial regalia crafted by fourth-generation master artisans using French metallic bullion wire, seed pearls, and genuine gold zari on handwoven raw silk.'
  }
];

const WOMEN_OUTFITS: StudioOutfit[] = [
  {
    id: 'studio-w-01',
    name: 'The Alabaster Overcoat & Silk Slip',
    subtitle: 'Double-Faced Virgin Wool with Hammered Mulberry Silk Bias Dress',
    category: 'Coats & Outerwear',
    price: 890,
    image: '/images/cutout-women-1.png',
    gender: 'women',
    modelInfo: 'Elena (5\'10" · Wearing Size S)',
    fabric: '100% Virgin Italian Wool shell, 100% Mulberry Silk bias dress',
    origin: 'Como & Biella, Italy',
    colors: [
      { name: 'Alabaster Ivory', hex: '#FAF7F2' },
      { name: 'Oatmeal Taupe', hex: '#CBBFA9' },
      { name: 'Espresso Noir', hex: '#262320' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    highlights: [
      'Unlined Italian double-faced wool construction',
      'Invisible hand-split interior seam finishing',
      'Hammered liquid silk charmeuse slip dress',
      'Calfskin pointed runway boots included in look'
    ],
    description: 'Sculpted from unlined Italian double-faced virgin wool. Designed with dropped shoulders, sweeping lapels, and hand-finished invisible seam construction.'
  },
  {
    id: 'studio-w-02',
    name: 'Camel Structured Trench & Trousers',
    subtitle: 'Wool-Gabardine Belted Coat with Wide-Leg Pleated Slacks',
    category: 'Coats & Outerwear',
    price: 940,
    image: '/images/cutout-women-2.png',
    gender: 'women',
    modelInfo: 'Sasha (5\'11" · Wearing Size S)',
    fabric: '100% Compact Wool Gabardine with Bemberg Cupro',
    origin: 'Milan, Italy',
    colors: [
      { name: 'Warm Camel', hex: '#B5946A' },
      { name: 'Bone White', hex: '#EFECE6' },
      { name: 'Midnight Navy', hex: '#1C2430' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    highlights: [
      'Water-repelling compact wool gabardine',
      'Genuine raw horn buckle and storm flaps',
      'High-waisted fluid pleated trousers',
      'Curved leather pochette bag pairing'
    ],
    description: 'Heavyweight wool gabardine engineered to resist autumn mist. Detailed with deep storm flaps, horn buckle belt, and generous patch pockets.'
  },
  {
    id: 'studio-w-03',
    name: 'Minimalist Charcoal Cashmere Duo',
    subtitle: 'Fine Gauge Cashmere Knit Polo with High-Rise Fluid Culottes',
    category: 'Fine Knitwear',
    price: 720,
    image: '/images/cutout-women-3.png',
    gender: 'women',
    modelInfo: 'Aria (5\'10" · Wearing Size S)',
    fabric: '100% Inner Mongolian Cashmere & Tropical Wool',
    origin: 'Inner Mongolia / Florence',
    colors: [
      { name: 'Charcoal Heather', hex: '#3E3C38' },
      { name: 'Sand Melange', hex: '#CDC3B3' },
      { name: 'Pitch Noir', hex: '#161514' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    highlights: [
      '2/28 superfine Grade-A Mongolian cashmere',
      'Featherweight warmth without any bulk',
      'Fluid high-twist wool culotte trousers',
      'Square-toe calf hair mules'
    ],
    description: 'Grade-A Inner Mongolian cashmere spun at 2/28 count for lightweight warmth without bulk. Paired with fluid Italian high-twist wool.'
  },
  {
    id: 'studio-w-04',
    name: 'Sculpted Chocolate Wool Blazer Set',
    subtitle: 'Hourglass Worsted Tailoring with Pressed Cigarette Trousers',
    category: 'Suits & Tailoring',
    price: 910,
    image: '/images/cutout-women-4.png',
    gender: 'women',
    modelInfo: 'Maya (5\'11" · Wearing Size S)',
    fabric: 'Super 130s Worsted Wool (380 GSM)',
    origin: 'Biella, Italy',
    colors: [
      { name: 'Dark Chocolate', hex: '#3B2F2A' },
      { name: 'Caramel Suede', hex: '#A37952' },
      { name: 'Onyx Black', hex: '#181716' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    highlights: [
      'Hand-canvassed sculpted hourglass waistline',
      'Sharp peaked lapels with roped shoulders',
      'Knife-crease cigarette trousers',
      'Solid brass bar buckle leather belt'
    ],
    description: 'Hand-canvassed chest piece that shapes organically to the body. Cut from 380 GSM worsted wool with dramatic nipped waist.'
  },
  {
    id: 'studio-w-05',
    name: 'Sleek Tuxedo Tailoring & Satin Lapel',
    subtitle: 'Evening Black-Tie Barathea with Duchess Silk Accents',
    category: 'Evening & Tailoring',
    price: 1040,
    image: '/images/cutout-women-5.png',
    gender: 'women',
    modelInfo: 'Chloe (5\'10" · Wearing Size S)',
    fabric: 'Barathea Virgin Wool with 100% Duchess Silk Trim',
    origin: 'Paris / London Tailoring',
    colors: [
      { name: 'Midnight Ink', hex: '#161515' },
      { name: 'Ivory Tuxedo', hex: '#F6F3EB' },
      { name: 'Deep Amethyst', hex: '#31202C' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    highlights: [
      'Lustrous Duchess silk peak lapels',
      'Silk-covered handmade tuxedo buttons',
      'Satin side-stripe smoking trousers',
      'Patent leather D\'Orsay stiletto pairing'
    ],
    description: 'Black-tie perfection with lustrous Duchess silk lapels, covered fabric buttons, and lean smoking silhouette.'
  },
  {
    id: 'studio-w-06',
    name: 'Oatmeal Cable Knit & Bias Silk Maxi',
    subtitle: 'Plush Alpaca-Wool Ribbed Mockneck with Liquid Charmeuse Skirt',
    category: 'Knitwear & Dresses',
    price: 660,
    image: '/images/cutout-women-6.png',
    gender: 'women',
    modelInfo: 'Freja (5\'9" · Wearing Size S)',
    fabric: '70% Wool, 30% Baby Alpaca / 100% Silk Charmeuse',
    origin: 'Peru / Como, Italy',
    colors: [
      { name: 'Oatmeal Melange', hex: '#DED5C5' },
      { name: 'Cloud Grey', hex: '#CBC9C4' },
      { name: 'Dark Taupe', hex: '#635B50' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    highlights: [
      'Plush 4-ply Peruvian baby alpaca blend',
      'Chunky fisherman rib mockneck collar',
      'Bias-cut liquid silk charmeuse maxi skirt',
      'Lug-sole leather penny loafers'
    ],
    description: 'Plush ribbed fisherman knit spun from 4-ply Peruvian alpaca and wool blend, casually draped over fluid silk charmeuse.'
  }
];

export const Circular3DDeconstruct: React.FC<Circular3DDeconstructProps> = ({
  onAddToCart,
  onOpenTailoring,
  onSelectProductFor3D,
  activeGender = 'women',
}) => {
  // Use either Women or Men outfits based on active gender
  const outfits = activeGender === 'men' ? MEN_OUTFITS : WOMEN_OUTFITS;

  // Selected outfit index
  const [selectedOutfitIdx, setSelectedOutfitIdx] = useState<number>(0);
  const activeOutfit = outfits[selectedOutfitIdx] || outfits[0];

  // Selected size & color
  const [selectedSize, setSelectedSize] = useState<string>(activeOutfit.sizes[1] || activeOutfit.sizes[0]);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);

  // 3D Turntable rotation state:
  // pedestalAngle rotates the gold compass pedestal floor at the feet
  // modelTilt provides responsive 3D parallax tilt (-14deg to +14deg) without paper-thin flipping
  const [pedestalAngle, setPedestalAngle] = useState<number>(0);
  const [modelTilt, setModelTilt] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [zoomDetail, setZoomDetail] = useState<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragStartTilt = useRef<number>(0);

  // Reset index when gender switches
  useEffect(() => {
    setSelectedOutfitIdx(0);
    setSelectedSize(outfits[0].sizes[1] || outfits[0].sizes[0]);
    setSelectedColorIdx(0);
    setModelTilt(0);
    setZoomDetail(false);
  }, [activeGender]);

  // Update size when outfit changes
  useEffect(() => {
    if (activeOutfit) {
      setSelectedSize(activeOutfit.sizes[1] || activeOutfit.sizes[0]);
      setSelectedColorIdx(0);
    }
  }, [activeOutfit?.id]);

  // Smooth continuous turntable rotation loop & subtle natural model breathing sway
  useEffect(() => {
    let animId: number;
    if (isRotating && !isDragging) {
      const step = () => {
        setPedestalAngle((prev) => (prev + 0.6) % 360);
        const t = Date.now() / 1500;
        setModelTilt(Math.sin(t) * 4);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isRotating, isDragging]);

  // Mouse / Touch Drag for natural 3D parallax tilt (clamped between -14deg and +14deg)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartTilt.current = modelTilt;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    const newTilt = Math.max(-14, Math.min(14, dragStartTilt.current + delta * 0.12));
    setModelTilt(newTilt);
    setPedestalAngle((prev) => (prev + delta * 0.2 + 3600) % 360);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleNextOutfit = () => {
    setSelectedOutfitIdx((prev) => (prev + 1) % outfits.length);
  };

  const handlePrevOutfit = () => {
    setSelectedOutfitIdx((prev) => (prev - 1 + outfits.length) % outfits.length);
  };

  const handleAddCurrentToBag = () => {
    const activeColor = activeOutfit.colors[selectedColorIdx] || activeOutfit.colors[0];
    const productItem: Product = {
      id: activeOutfit.id,
      name: activeOutfit.name,
      subtitle: activeOutfit.subtitle,
      category: activeGender,
      subCategory: activeOutfit.category,
      price: activeOutfit.price,
      image: activeOutfit.image,
      backImage: activeOutfit.image,
      colors: activeOutfit.colors,
      sizes: activeOutfit.sizes,
      fabric: activeOutfit.fabric,
      description: activeOutfit.description,
      details: activeOutfit.highlights,
      inStock: true,
    };
    onAddToCart(productItem, selectedSize, activeColor.name);
  };

  return (
    <section className="relative w-full bg-[#f4f3f0] text-[#151412] py-16 sm:py-24 overflow-hidden select-none border-b border-[#e3e0da]">
      
      {/* Background Ambience: Clean Luxury Warm Paper with Soft Ambient Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(184,149,98,0.1),transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#e3e0da]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#b89562] animate-pulse"></span>
              <span className="text-[11px] font-manrope font-semibold tracking-[0.2em] uppercase text-[#77736c]">
                Interactive 3D Studio · 360° Inspection
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#151412]"></span>
              <span className="text-[11px] font-manrope font-semibold uppercase text-[#151412]">
                {activeGender === 'men' ? 'Menswear Edition' : 'Womenswear Edition'}
              </span>
            </div>
            
            <h2 className="font-instrument text-3xl sm:text-4xl lg:text-5xl font-normal text-[#151412] tracking-tight">
              360° Studio — {activeGender === 'men' ? 'Tailored Menswear' : 'Luxury Womenswear'}
            </h2>
            
            <p className="font-manrope text-xs sm:text-sm text-[#77736c] font-light mt-1">
              The 3D model automatically rotates in 360°. Tap any outfit below to dress the model instantly. Drag horizontally to spin by hand.
            </p>
          </div>

          {/* 360 Play / Pause Toggle Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-manrope font-semibold border transition-all shadow-xs ${
                isRotating
                  ? 'bg-[#151412] text-white border-[#151412]'
                  : 'bg-white text-[#151412] border-[#e3e0da] hover:border-[#151412]'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span>{isRotating ? '360° Rotating (Auto)' : '360° Paused'}</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevOutfit}
                className="w-9 h-9 rounded-full bg-white border border-[#e3e0da] flex items-center justify-center hover:bg-[#151412] hover:text-white transition-colors"
                aria-label="Previous Outfit"
                title="Previous Outfit"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextOutfit}
                className="w-9 h-9 rounded-full bg-white border border-[#e3e0da] flex items-center justify-center hover:bg-[#151412] hover:text-white transition-colors"
                aria-label="Next Outfit"
                title="Next Outfit"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* OUTFIT SELECTOR STRIP: Kapde Change Karne Ka Strip */}
        <div className="mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {outfits.map((item, idx) => {
              const isSelected = idx === selectedOutfitIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedOutfitIdx(idx)}
                  className={`flex items-center gap-3 p-2.5 pr-5 rounded-2xl border transition-all duration-300 flex-shrink-0 text-left ${
                    isSelected
                      ? 'bg-white border-[#151412] shadow-md ring-1 ring-[#151412] scale-102'
                      : 'bg-white/70 border-[#e3e0da] hover:bg-white hover:border-[#b89562]'
                  }`}
                >
                  <div className="w-12 h-14 rounded-xl bg-[#e8ded1]/30 overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-auto object-contain object-top"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#b89562] block leading-none">
                      Look 0{idx + 1}
                    </span>
                    <h4 className="font-manrope text-xs font-semibold text-[#151412] line-clamp-1 mt-0.5">
                      {item.name}
                    </h4>
                    <span className="text-[11px] font-manrope font-bold text-[#151412]">
                      ${item.price} USD
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN 3D ROTATING SHOWCASE: 2-COLUMN LUXURY STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#e3e0da] shadow-[0_20px_50px_rgba(21,20,18,0.06)]">
          
          {/* LEFT: THE BIG 3D ROTATING MODEL STAGE (7 COLS) */}
          <div
            className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[520px] sm:min-h-[620px] cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Top Interactive Hint Pill */}
            <div className="absolute top-0 left-0 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#e3e0da] text-[11px] font-manrope text-[#77736c] shadow-xs">
              <RotateCw className="w-3.5 h-3.5 text-[#151412]" />
              <span>Drag to tilt 3D perspective · Model stays front-facing</span>
            </div>

            {/* Circular 3D Turntable Pedestal Floor (Perspective Disc) */}
            <div
              className="absolute bottom-16 sm:bottom-20 w-80 sm:w-[440px] h-32 rounded-full border-2 border-[#b89562]/30 shadow-[0_25px_40px_rgba(21,20,18,0.12)] pointer-events-none"
              style={{
                transform: 'rotateX(75deg)',
                background: 'radial-gradient(ellipse at center, #ffffff 30%, #f4f0e6 70%, #ded7c8 100%)',
              }}
            >
              {/* Spinning rim markers */}
              <div
                className="w-full h-full rounded-full border border-dashed border-[#b89562]/50"
                style={{
                  transform: `rotate(${pedestalAngle}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.1s linear',
                }}
              />
            </div>

            {/* THE BIG MODEL WITH 3D PERSPECTIVE TILT (ZERO CARD/BOX BACKGROUND) */}
            <div
              className="relative flex flex-col items-center justify-center z-10 select-none"
              style={{
                perspective: '1400px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                style={{
                  transform: `rotateY(${modelTilt}deg) scale(${zoomDetail ? 1.25 : 1})`,
                  transformStyle: 'preserve-3d',
                  transition: isDragging ? 'none' : 'transform 0.25s ease-out',
                }}
              >
                <img
                  src={activeOutfit.image}
                  alt={activeOutfit.name}
                  className="max-h-[480px] sm:max-h-[580px] w-auto object-contain filter drop-shadow-[0_25px_35px_rgba(21,20,18,0.22)] pointer-events-none"
                  loading="eager"
                />
              </div>

              {/* Realistic Contact Shadow on the Turntable */}
              <div className="w-52 h-5 rounded-full bg-[#151412]/25 blur-md -mt-3 mx-auto" />
            </div>

            {/* Interactive Angle & Zoom Controls */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 z-20">
              <button
                onClick={() => { setModelTilt(-10); setIsRotating(false); }}
                className={`px-3 py-1 rounded-full text-[11px] font-manrope font-semibold border transition-all ${
                  Math.round(modelTilt) === -10
                    ? 'bg-[#151412] text-white border-[#151412]'
                    : 'bg-white text-[#77736c] border-[#e3e0da] hover:border-[#151412]'
                }`}
              >
                Angled Left
              </button>
              <button
                onClick={() => { setModelTilt(0); setIsRotating(false); }}
                className={`px-3 py-1 rounded-full text-[11px] font-manrope font-semibold border transition-all ${
                  Math.round(modelTilt) === 0
                    ? 'bg-[#151412] text-white border-[#151412]'
                    : 'bg-white text-[#77736c] border-[#e3e0da] hover:border-[#151412]'
                }`}
              >
                Front Pose
              </button>
              <button
                onClick={() => { setModelTilt(10); setIsRotating(false); }}
                className={`px-3 py-1 rounded-full text-[11px] font-manrope font-semibold border transition-all ${
                  Math.round(modelTilt) === 10
                    ? 'bg-[#151412] text-white border-[#151412]'
                    : 'bg-white text-[#77736c] border-[#e3e0da] hover:border-[#151412]'
                }`}
              >
                Angled Right
              </button>
              <button
                onClick={() => setZoomDetail(!zoomDetail)}
                className={`px-3 py-1 rounded-full text-[11px] font-manrope font-semibold border transition-all ${
                  zoomDetail
                    ? 'bg-[#b89562] text-white border-[#b89562]'
                    : 'bg-white text-[#77736c] border-[#e3e0da] hover:border-[#b89562]'
                }`}
              >
                {zoomDetail ? 'Normal View' : 'Fabric Zoom'}
              </button>
            </div>

            {/* Model stats footer */}
            <div className="mt-2 text-[11px] font-manrope text-[#77736c] text-center z-10">
              <span>Model: <strong className="text-[#151412]">{activeOutfit.modelInfo}</strong></span>
              <span className="mx-2">·</span>
              <span>Outfit 0{selectedOutfitIdx + 1} of {outfits.length}</span>
            </div>
          </div>

          {/* RIGHT: OUTFIT DETAILS, SIZES, CUSTOMIZATION & BAG (5 COLS) */}
          <div className="lg:col-span-5 bg-[#f9f8f6] border border-[#e3e0da] rounded-2xl p-6 sm:p-7 space-y-6">
            
            {/* Header: Title, Category & Price */}
            <div className="border-b border-[#e3e0da] pb-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-manrope font-bold uppercase tracking-[0.2em] text-[#b89562]">
                  {activeOutfit.category}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white border border-[#e3e0da] text-[#77736c] font-manrope">
                  {activeOutfit.origin}
                </span>
              </div>

              <h3 className="font-instrument text-2xl sm:text-3xl text-[#151412] mt-1 font-normal tracking-tight">
                {activeOutfit.name}
              </h3>

              <p className="text-xs text-[#77736c] font-manrope font-light mt-1.5 leading-relaxed">
                {activeOutfit.subtitle}
              </p>

              {/* Price & Guarantee */}
              <div className="flex items-baseline justify-between mt-4 pt-3 border-t border-[#e3e0da]/60">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-manrope font-bold text-[#151412]">
                    ${activeOutfit.price}
                  </span>
                  <span className="text-xs font-manrope text-[#77736c]">
                    USD
                  </span>
                </div>

                <span className="text-[11px] font-manrope text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Ready to Wear & Bespoke
                </span>
              </div>
            </div>

            {/* Colour Variant Swatches */}
            <div>
              <div className="flex items-center justify-between text-xs font-manrope mb-2">
                <span className="text-[#77736c]">Select Colourway:</span>
                <span className="font-semibold text-[#151412]">
                  {activeOutfit.colors[selectedColorIdx]?.name || activeOutfit.colors[0].name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {activeOutfit.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(i)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-manrope transition-all ${
                      i === selectedColorIdx
                        ? 'border-[#151412] bg-white font-semibold text-[#151412] shadow-xs ring-1 ring-[#151412]'
                        : 'border-[#e3e0da] text-[#77736c] hover:border-[#151412] bg-white/60'
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

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-manrope mb-2">
                <span className="text-[#77736c]">Select Size:</span>
                <span className="font-semibold text-[#151412]">Size {selectedSize}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeOutfit.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-manrope font-semibold border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#151412] text-white border-[#151412] shadow-xs'
                        : 'bg-white text-[#151412] border-[#e3e0da] hover:border-[#151412]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Sartorial Highlights */}
            <div className="p-3.5 rounded-xl bg-white border border-[#e3e0da] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b89562] block">
                Artisanal Craftsmanship
              </span>
              <ul className="space-y-1.5">
                {activeOutfit.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-manrope text-[#52504c]">
                    <Check className="w-3.5 h-3.5 text-[#b89562] flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons: Add to Bag & Custom Tailoring */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddCurrentToBag}
                className="w-full py-3.5 px-6 rounded-full bg-[#151412] hover:bg-black text-white font-manrope text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag (${activeOutfit.price})</span>
              </button>

              <button
                onClick={onOpenTailoring}
                className="w-full py-3 px-6 rounded-full border border-[#151412] hover:bg-[#151412] hover:text-white text-[#151412] font-manrope text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Custom Made-to-Measure</span>
              </button>
            </div>

            {/* Reassurance notes */}
            <div className="flex items-center justify-between text-[11px] font-manrope text-[#77736c] pt-2 border-t border-[#e3e0da]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#151412]" /> Free express delivery
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#151412]" /> Complimentary alterations
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
