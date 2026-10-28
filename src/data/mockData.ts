import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 3D Clothing Rail Featured Products
  {
    id: 'rack-1',
    name: 'Rosewood Crewneck Sweater',
    subtitle: 'Ultra-Fine Merino Wool Blend',
    category: 'men',
    subCategory: 'Knitwear & Sweaters',
    price: 340,
    originalPrice: 420,
    tag: 'NEW',
    image: '/images/rack-crewneck-clean.png',
    backImage: '/images/rack-crewneck-clean.png',
    colors: [
      { name: 'Rosewood Dust', hex: '#A36868' },
      { name: 'Ivory Cream', hex: '#FAF5EE' },
      { name: 'Charcoal Black', hex: '#20201E' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '85% Australian Merino Wool, 15% Mulberry Silk',
    description: 'Crafted with fine gauge knitting technique offering exceptional softness and breathable insulation. Finished with a discrete tonal chest accent line and rib-knit cuffs.',
    details: [
      'Gauge 14 circular knit construction',
      'Naturally thermoregulating wool',
      'Ribbed hem, cuffs and crew collar',
      'Dry clean only / hand wash cold'
    ],
    inStock: true,
    rackFeatured: true,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'rack-2',
    name: 'Forest Green Signature Hoodie',
    subtitle: '500 GSM Heavyweight French Terry',
    category: 'men',
    subCategory: 'Hoodies & Casual',
    price: 290,
    originalPrice: 350,
    tag: 'ONLY 3 LEFT',
    image: '/images/rack-hoodie-clean.png',
    backImage: '/images/rack-hoodie-clean.png',
    colors: [
      { name: 'Deep Forest Green', hex: '#31443A' },
      { name: 'Heather Grey', hex: '#B0B0AC' },
      { name: 'Pitch Black', hex: '#1C1C1A' },
    ],
    sizes: ['M', 'L', 'XL'],
    fabric: '100% Organic GOTS-Certified Heavy French Terry Cotton',
    description: 'Substantial 500 GSM luxury hoodie with double-layer hood, hidden kangaroo phone pouch, and custom embossed archival AK Garments branding.',
    details: [
      'Pre-shrunk vintage wash fabric',
      'Reinforced bar-tack stitching on stress points',
      'Drop-shoulder relaxed silhouette',
      'Made in limited sartorial batches'
    ],
    inStock: true,
    rackFeatured: true,
    rating: 5.0,
    reviewsCount: 64
  },
  {
    id: 'rack-3',
    name: 'Crisp Poplin Sartorial Shirt',
    subtitle: '140/2 Two-Ply Egyptian Giza Cotton',
    category: 'men',
    subCategory: 'Shirts',
    price: 220,
    originalPrice: 280,
    tag: 'BESTSELLER',
    image: '/images/rack-shirt-clean.png',
    backImage: '/images/rack-shirt-clean.png',
    colors: [
      { name: 'Warm Ivory', hex: '#F7F3ED' },
      { name: 'Sky Azure', hex: '#CDE1EE' },
      { name: 'Midnight Charcoal', hex: '#20201E' },
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', 'Custom Fit'],
    fabric: '100% Long-Staple Egyptian Giza 87 Cotton',
    description: 'The definitive white dress shirt. Cut with semi-spread Italian collar, mother-of-pearl buttons, and split back yoke for effortless shoulder comfort.',
    details: [
      'Australian Mother-of-Pearl buttons attached with crowfoot stitch',
      'Removable brass collar stays included',
      'French seams with 22 stitches per inch',
      'Made-to-measure option available'
    ],
    inStock: true,
    rackFeatured: true,
    rating: 4.8,
    reviewsCount: 112
  },
  {
    id: 'rack-4',
    name: 'Sand Dune Tailored Wool Suit',
    subtitle: 'Super 150s Italian Loro Piana Wool',
    category: 'men',
    subCategory: 'Suits & Blazers',
    price: 1250,
    originalPrice: 1500,
    tag: 'BESPOKE CUT',
    image: '/images/rack-blazer-clean.png',
    backImage: '/images/bespoke-italian-suit.png',
    colors: [
      { name: 'Desert Sand', hex: '#D5C7B5' },
      { name: 'Charcoal Grey', hex: '#3B3B38' },
      { name: 'Navy Sartorial', hex: '#1E2530' },
    ],
    sizes: ['38R', '40R', '42R', '44R', 'Custom Tailored'],
    fabric: '100% Super 150s Merino Virgin Wool, Full Canvas',
    description: 'A benchmark in modern sartorial tailoring. Soft Neapolitan shoulder, genuine horn buttons, floating horsehair canvas construction that molds to your physique.',
    details: [
      'Full floating canvas interlining for lifetime drape',
      'Hand-sewn milanese buttonhole on lapel',
      'Double back vents and pick-stitching along edge',
      'Includes complimentary AK Garments alterations'
    ],
    inStock: true,
    rackFeatured: true,
    rating: 5.0,
    reviewsCount: 43
  },
  {
    id: 'rack-5',
    name: 'Imperial Ivory Royal Sherwani Set',
    subtitle: 'Zari & Resham Hand-Embroidered Silk',
    category: 'wedding',
    subCategory: 'Royal Groom Wear',
    price: 1850,
    originalPrice: 2200,
    tag: 'ROYAL HERITAGE',
    image: '/images/rack-sherwani-clean.png',
    backImage: '/images/groom-sherwani-royal.png',
    colors: [
      { name: 'Royal Ivory & Gold', hex: '#FAF6ED' },
      { name: 'Champagne Sand', hex: '#E2D5BE' },
      { name: 'Antique Pearl', hex: '#F0ECE1' },
    ],
    sizes: ['38', '40', '42', '44', 'Bespoke Groom Fitting'],
    fabric: 'Pure Mulberry Silk with 24k Gold Gilded Zari Thread',
    description: 'A masterpiece created for matrimonial celebrations. Thousands of intricate floral and geometric motifs hand-embroidered by generational artisans in Lucknow.',
    details: [
      'Over 280 hours of meticulous hand-embroidery',
      'Includes churidar trousers, matching stole (dupatta) and safa fabric',
      'Finished with natural silk brocade lining',
      'Private Master Tailor consultation included'
    ],
    inStock: true,
    rackFeatured: true,
    rating: 5.0,
    reviewsCount: 29
  },
  {
    id: 'rack-6',
    name: 'Contemporary Linen Double-Breasted Suit',
    subtitle: 'Womenswear Sartorial Ensemble',
    category: 'women',
    subCategory: 'Suits & Outerwear',
    price: 890,
    originalPrice: 1100,
    tag: 'NEW ARRIVAL',
    image: '/images/rack-cardigan-clean.png',
    backImage: '/images/lookbook-parallel.png',
    colors: [
      { name: 'Soft Sand Flax', hex: '#E8DED1' },
      { name: 'Warm Terracotta', hex: '#B87252' },
      { name: 'Alabaster White', hex: '#F8F6F2' },
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)'],
    fabric: '100% Delave Irish Linen with Cupro Lining',
    description: 'An architectural double-breasted silhouette tailored with relaxed feminine elegance. Pleated high-waisted palazzo trousers pair with a peaked lapel blazer.',
    details: [
      'Corozo nut buttons with laser engraved monogram',
      'Breathable garment-washed natural linen',
      'Fluid interior viscose lining',
      'Dry clean only'
    ],
    inStock: true,
    rackFeatured: true,
    rating: 4.9,
    reviewsCount: 52
  },

  // Additional Catalog Products
  {
    id: 'prod-7',
    name: 'The Grand Safa Wedding Sherwani',
    subtitle: 'Heirloom Groom Ensemble with Royal Turban',
    category: 'wedding',
    subCategory: 'Royal Groom Wear',
    price: 2100,
    tag: 'LIMITED EDITION',
    image: '/images/groom-sherwani-royal.png',
    backImage: '/images/royal-sherwani-gold.png',
    colors: [
      { name: 'Pearl Ivory', hex: '#FBF9F5' },
      { name: 'Regal Gold', hex: '#B89562' },
    ],
    sizes: ['38', '40', '42', '44', 'Custom Fit'],
    fabric: 'Raw Silk & Fine Mukaish Embroidered Jacquard',
    description: 'Complete royal wedding ensemble with coordinating pleated safa, multi-strand simulated pearl necklace, and hand-embroidered leather mojari footwear.',
    details: [
      'Hand-stitched mandarin collar with jeweled buttons',
      'Traditional kalidar silhouette with royal flare',
      'Comes in luxury cedar preservation box'
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: 'prod-8',
    name: 'Loro Piana Suede Italian Loafer',
    subtitle: 'Hand-Welted Luxury Footwear',
    category: 'men',
    subCategory: 'Accessories',
    price: 490,
    originalPrice: 580,
    tag: 'HANDMADE',
    image: '/images/runway-men-1.png',
    backImage: '/images/runway-men-1.png',
    colors: [
      { name: 'Espresso Suede', hex: '#3B2F2F' },
      { name: 'Sand Brown', hex: '#9E8465' },
    ],
    sizes: ['40 (7 UK)', '41 (8 UK)', '42 (9 UK)', '43 (10 UK)', '44 (11 UK)'],
    fabric: 'Full-Grain Tuscan Calf Suede, Latex Gum Sole',
    description: 'Water-repellent unlined suede loafers designed for peerless summer luxury. Ultra-lightweight and flexible walking sensation.',
    details: [
      'Blake-stitched construction',
      'Slip-resistant non-marking rubber outsole',
      'Made in Civitanova Marche, Italy'
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 71
  },
  {
    id: 'prod-9',
    name: 'Bespoke Savile Row Navy Blazer',
    subtitle: 'Super 130s All-Season Wool',
    category: 'tailoring',
    subCategory: 'Blazers & Jackets',
    price: 980,
    tag: 'BESPOKE',
    image: '/images/master-craftsman-atelier.png',
    backImage: '/images/bespoke-italian-suit.png',
    colors: [
      { name: 'Deep Midnight Navy', hex: '#161F2E' },
      { name: 'Forest Charcoal', hex: '#2C3531' },
    ],
    sizes: ['Custom Sized to Exact Body Metrics'],
    fabric: 'Holland & Sherry 100% Super 130s English Wool',
    description: 'Hand-tailored according to our master cutting method. Each garment requires over 45 individual measurements and two personal fittings.',
    details: [
      'Bespoke hand-cut pattern draft preserved in atelier archives',
      'Bemberg cupro lining with custom interior monogram',
      'Solid bronze crested buttons'
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 88
  },
  {
    id: 'prod-10',
    name: 'Draped Satin Evening Gown',
    subtitle: 'Sculptural Fluid Womenswear',
    category: 'women',
    subCategory: 'Dresses',
    price: 760,
    originalPrice: 920,
    tag: 'LIMITED',
    image: '/images/runway-women-5.jpg',
    backImage: '/images/runway-women-5.jpg',
    colors: [
      { name: 'Burnt Ochre', hex: '#C26B38' },
      { name: 'Champagne Silk', hex: '#EADBC8' },
      { name: 'Black Onyx', hex: '#1B1B1B' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: '100% Heavy Silk Charmeuse',
    description: 'Bias-cut evening dress cascading gently around the waistline. Features a delicate halter neck with open cowl back.',
    details: [
      'Self-lined bodice with French seam finishing',
      'Floor length with slight puddle train',
      'Dry clean only'
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 31
  },
  {
    id: 'prod-11',
    name: 'Pure Pashmina Silk Kurta Set',
    subtitle: 'Festive Occasion Ensemble',
    category: 'ethnic',
    subCategory: 'Kurtas & Ethnic',
    price: 480,
    tag: 'FESTIVE EDIT',
    image: '/images/royal-sherwani-gold.png',
    backImage: '/images/groom-sherwani-royal.png',
    colors: [
      { name: 'Ivory Sand', hex: '#F5EFE6' },
      { name: 'Mint Sage', hex: '#B8C5BD' },
      { name: 'Blush Gold', hex: '#E8D3C5' },
    ],
    sizes: ['38', '40', '42', '44'],
    fabric: '60% Kashmiri Pashmina, 40% Raw Mulberry Silk',
    description: 'Lightweight festive kurta set accented with subtle tonal thread embroidery around the mandarin collar and concealed placket.',
    details: [
      'Includes matching silk pyjama trousers',
      'Dual concealed side pockets',
      'Handcrafted fabric buttons'
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 45
  },
  {
    id: 'prod-12',
    name: 'AK Garments Leather Weekender Duffle',
    subtitle: 'Full-Grain Tuscan Vachetta Leather',
    category: 'men',
    subCategory: 'Accessories',
    price: 650,
    originalPrice: 780,
    tag: 'HERITAGE',
    image: '/images/luxury-boutique-rack.png',
    backImage: '/images/runway-men-2.jpg',
    colors: [
      { name: 'Cognac Saddle', hex: '#8B4513' },
      { name: 'Charcoal Black', hex: '#20201E' },
    ],
    sizes: ['One Size (45L Capacity)'],
    fabric: 'Vegetable-Tanned Italian Vachetta Leather & Solid Brass Hardware',
    description: 'A timeless travel companion crafted to develop an enviable patina over decades of journeying. Meets cabin baggage guidelines worldwide.',
    details: [
      'Solid antique brass YKK Excella zippers',
      'Detachable padded leather shoulder strap',
      'Lined with durable British cotton canvas'
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 67
  }
];

export const CATEGORIES = [
  {
    id: 'men',
    name: 'Menswear Sartorial',
    itemsCount: 140,
    tagline: 'Tailored suits, crisp poplin shirts & casual cashmere',
    image: '/images/tailored-suit-sand.png',
    subcategories: ['Suits & Blazers', 'Luxury Shirts', 'Trousers', 'Knitwear', 'Jackets & Coats']
  },
  {
    id: 'women',
    name: 'AK Garments Womenswear Atelier',
    itemsCount: 115,
    tagline: 'Architectural tailoring, silk dresses & co-ord sets',
    image: '/images/luxury-editorial-duo.png',
    subcategories: ['Evening Dresses', 'Contemporary Suits', 'Linen Ensembles', 'Outerwear', 'Silk Tops']
  },
  {
    id: 'wedding',
    name: 'The Royal Wedding Edit',
    itemsCount: 65,
    tagline: 'Heritage sherwanis, safas, bandhgalas & tuxedos',
    image: '/images/royal-sherwani-gold.png',
    subcategories: ['Groom Sherwanis', 'Black Tie Tuxedos', 'Indo-Western Sets', 'Wedding Turbans & Safas']
  },
  {
    id: 'tailoring',
    name: 'Bespoke Custom Tailoring',
    itemsCount: 'Made-To-Measure',
    tagline: 'Handcrafted to your exact metrics by master tailors',
    image: '/images/master-craftsman-atelier.png',
    subcategories: ['Custom 3-Piece Suits', 'Bespoke Dress Shirts', 'Pleated Trousers', 'Custom Sherwanis']
  }
];

export const FABRICS_DATABASE = [
  {
    id: 'fab-1',
    name: 'Super 150s Australian Wool',
    material: 'Virgin Merino Wool',
    origin: 'Biella, Italy (Loro Piana Mills)',
    color: 'Sand Dune Tan',
    price: 450,
    image: '/images/tailored-suit-sand.png',
    weight: '260 GSM (All Season)'
  },
  {
    id: 'fab-2',
    name: 'Egyptian Giza 87 Poplin',
    material: '100% Two-Ply Combed Cotton',
    origin: 'Alexandria, Egypt (Thomas Mason)',
    color: 'Warm Ivory White',
    price: 180,
    image: '/images/clothing-rack-studio.png',
    weight: '120 GSM (Ultra Breathable)'
  },
  {
    id: 'fab-3',
    name: 'Kashi Raw Silk Brocade',
    material: '100% Hand-Spun Mulberry Silk with Zari',
    origin: 'Varanasi, India',
    color: 'Royal Champagne Gold',
    price: 520,
    image: '/images/royal-sherwani-gold.png',
    weight: '340 GSM (Royal Matrimonial)'
  },
  {
    id: 'fab-4',
    name: 'Pure Irish Delave Linen',
    material: '100% Flax Linen',
    origin: 'Belfast, Northern Ireland (Baird McNutt)',
    color: 'Oatmeal Natural',
    price: 260,
    image: '/images/luxury-editorial-duo.png',
    weight: '220 GSM (Summer Sartorial)'
  },
  {
    id: 'fab-5',
    name: 'Midnight Cashmere & Silk Twill',
    material: '70% Cashmere, 30% Mulberry Silk',
    origin: 'Trivero, Italy (Ermenegildo Zegna)',
    color: 'Midnight Charcoal',
    price: 680,
    image: '/images/bespoke-italian-suit.png',
    weight: '310 GSM (Autumn / Winter)'
  }
];
