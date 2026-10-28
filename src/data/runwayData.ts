import { RunwayLook } from '../types';

export const RUNWAY_LOOKS_WOMEN: RunwayLook[] = [
  {
    id: 'look-w-01',
    number: '01 / 06',
    title: 'The Alabaster Overcoat & Slip',
    tagline: 'Six looks, styled head to toe. Tap anyone in the line to bring them forward.',
    gender: 'women',
    totalPrice: 890,
    hasTurntable: true,
    colors: [
      { name: 'Alabaster Ivory', hex: '#FAF7F2', image: '/images/cutout-women-1.png' },
      { name: 'Oatmeal Taupe', hex: '#CBBFA9', image: '/images/cutout-women-2.png' },
      { name: 'Espresso Noir', hex: '#262320', image: '/images/cutout-women-5.png' },
    ],
    pieces: [
      {
        id: 'w01-coat',
        name: 'Double-Faced Wool Cocoon Coat',
        category: 'Coats & Outerwear',
        price: 540,
        image: '/images/runway-women-1.jpg',
        color: 'Alabaster Ivory',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w01-slip',
        name: 'Hammered Silk Bias Midi Slip',
        category: 'Dresses',
        price: 210,
        image: '/images/runway-women-6.jpg',
        color: 'Ivory Sheen',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w01-boots',
        name: 'Pointed Calfskin Runway Boots',
        category: 'Footwear',
        price: 140,
        image: '/images/runway-women-2.jpg',
        color: 'Espresso Brown',
        sizes: ['6', '7', '8', '9', '10']
      }
    ],
    description: 'Sculpted from unlined Italian double-faced virgin wool. Designed with dropped shoulders, sweeping lapels, and hand-finished invisible seam construction.',
    fabricCare: '100% Virgin Italian Wool shell. 100% Mulberry Silk bias dress. Specialist dry clean only.',
    sizeFit: 'Model is 5\'10" (178cm) with 32" bust and 25" waist wearing size S. Fluid, relaxed silhouette.',
    shippingReturns: 'Complimentary worldwide express shipping. Free doorstep returns and exchanges within 30 days.'
  },
  {
    id: 'look-w-02',
    number: '02 / 06',
    title: 'Camel Structured Trench & Trousers',
    tagline: 'Precision tailoring balanced with fluid drape and raw horn closures.',
    gender: 'women',
    totalPrice: 940,
    hasTurntable: true,
    colors: [
      { name: 'Warm Camel', hex: '#B5946A', image: '/images/cutout-women-2.png' },
      { name: 'Bone White', hex: '#EFECE6', image: '/images/cutout-women-1.png' },
      { name: 'Midnight Navy', hex: '#1C2430', image: '/images/cutout-women-4.png' },
    ],
    pieces: [
      {
        id: 'w02-trench',
        name: 'Wool-Gabardine Belted Trench',
        category: 'Coats & Outerwear',
        price: 590,
        image: '/images/runway-women-2.jpg',
        color: 'Warm Camel',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w02-trouser',
        name: 'Wide-Leg Pleated Wool Trouser',
        category: 'Trousers',
        price: 230,
        image: '/images/runway-women-4.jpg',
        color: 'Camel Tonal',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w02-bag',
        name: 'Curved Leather Atelier Pochette',
        category: 'Leather Goods',
        price: 120,
        image: '/images/runway-women-3.jpg',
        color: 'Caramel Grain',
        sizes: ['One Size']
      }
    ],
    description: 'Heavyweight wool gabardine engineered to resist autumn mist. Detailed with deep storm flaps, horn buckle belt, and generous patch pockets.',
    fabricCare: '100% Compact Wool Gabardine. Bemberg cupro half-lining. Professional dry clean.',
    sizeFit: 'Fits true to size. Belt tightens for cinched waist or drape loose for relaxed movement.',
    shippingReturns: 'Complimentary express delivery and 30-day return window.'
  },
  {
    id: 'look-w-03',
    number: '03 / 06',
    title: 'Minimalist Charcoal Cashmere Duo',
    tagline: 'Superfine knit polo sweater coupled with pleated fluid wool culottes.',
    gender: 'women',
    totalPrice: 720,
    hasTurntable: false,
    colors: [
      { name: 'Charcoal Heather', hex: '#3E3C38', image: '/images/cutout-women-3.png' },
      { name: 'Sand Melange', hex: '#CDC3B3', image: '/images/cutout-women-1.png' },
      { name: 'Pitch Noir', hex: '#161514', image: '/images/cutout-women-5.png' },
    ],
    pieces: [
      {
        id: 'w03-knit',
        name: 'Fine Gauge Cashmere Polo Sweater',
        category: 'Knitwear',
        price: 360,
        image: '/images/runway-women-3.jpg',
        color: 'Charcoal Heather',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w03-trouser',
        name: 'High-Rise Fluid Pleated Pant',
        category: 'Trousers',
        price: 240,
        image: '/images/runway-women-3.jpg',
        color: 'Charcoal Tonal',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w03-mules',
        name: 'Square-Toe Calf Hair Mules',
        category: 'Footwear',
        price: 120,
        image: '/images/runway-women-6.jpg',
        color: 'Jet Black',
        sizes: ['6', '7', '8', '9', '10']
      }
    ],
    description: 'Grade-A Inner Mongolian cashmere spun at 2/28 count for lightweight warmth without bulk. Paired with fluid Italian high-twist wool.',
    fabricCare: '100% Cashmere top. 100% Tropical wool bottoms. Hand wash cold or dry clean.',
    sizeFit: 'Model is 5\'11" wearing size S. High waistline with relaxed pooling hem.',
    shippingReturns: 'Free standard shipping on orders over $150.'
  },
  {
    id: 'look-w-04',
    number: '04 / 06',
    title: 'Sculpted Chocolate Wool Blazer Set',
    tagline: 'Hourglass tailoring with peak lapels, horn buttons and matching cigarette trousers.',
    gender: 'women',
    totalPrice: 910,
    hasTurntable: true,
    colors: [
      { name: 'Dark Chocolate', hex: '#3B2F2A', image: '/images/cutout-women-4.png' },
      { name: 'Caramel Suede', hex: '#A37952', image: '/images/cutout-women-2.png' },
      { name: 'Onyx Black', hex: '#181716', image: '/images/cutout-women-5.png' },
    ],
    pieces: [
      {
        id: 'w04-blazer',
        name: 'Sculpted Peak-Lapel Wool Blazer',
        category: 'Jackets',
        price: 520,
        image: '/images/runway-women-4.jpg',
        color: 'Dark Chocolate',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w04-trouser',
        name: 'Pressed Crease Cigarette Trouser',
        category: 'Trousers',
        price: 240,
        image: '/images/runway-women-4.jpg',
        color: 'Dark Chocolate',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w04-belt',
        name: 'Brass Bar Leather Belt',
        category: 'Accessories',
        price: 150,
        image: '/images/runway-women-2.jpg',
        color: 'Saddle Tan',
        sizes: ['75cm', '85cm', '95cm']
      }
    ],
    description: 'Hand-canvassed chest piece that shapes organically to the body. Cut from 380 GSM worsted wool with dramatic nipped waist.',
    fabricCare: 'Super 130s Italian Wool. Bemberg lining. Specialist dry clean.',
    sizeFit: 'Tailored fit. Structured shoulders with built-in light roping.',
    shippingReturns: 'Free returns within 30 days.'
  },
  {
    id: 'look-w-05',
    number: '05 / 06',
    title: 'Sleek Tuxedo Tailoring & Satin Lapel',
    tagline: 'Evening elegance with razor-sharp silk-satin peak lapels and cigarette pants.',
    gender: 'women',
    totalPrice: 1040,
    hasTurntable: false,
    colors: [
      { name: 'Midnight Ink', hex: '#161515', image: '/images/cutout-women-5.png' },
      { name: 'Ivory Tuxedo', hex: '#F6F3EB', image: '/images/cutout-women-1.png' },
      { name: 'Deep Amethyst', hex: '#31202C', image: '/images/cutout-women-4.png' },
    ],
    pieces: [
      {
        id: 'w05-tux',
        name: 'Silk-Trimmed Evening Tuxedo Jacket',
        category: 'Jackets',
        price: 640,
        image: '/images/runway-women-5.jpg',
        color: 'Midnight Ink',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w05-pant',
        name: 'Satin Side-Stripe Smoking Trouser',
        category: 'Trousers',
        price: 280,
        image: '/images/runway-women-5.jpg',
        color: 'Midnight Ink',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w05-heel',
        name: 'D\'Orsay Patent Leather Stiletto',
        category: 'Footwear',
        price: 120,
        image: '/images/runway-women-5.jpg',
        color: 'Patent Black',
        sizes: ['6', '7', '8', '9', '10']
      }
    ],
    description: 'Black-tie perfection with lustrous Duchess silk lapels, covered fabric buttons, and lean smoking silhouette.',
    fabricCare: 'Barathea virgin wool with 100% Silk accents. Professional dry clean only.',
    sizeFit: 'Precision tailored. Order your regular tailored size.',
    shippingReturns: 'Complimentary white-glove delivery in signature gift packaging.'
  },
  {
    id: 'look-w-06',
    number: '06 / 06',
    title: 'Oatmeal Cable Knit & Bias Silk Maxi',
    tagline: 'Tactile rib-knit softness harmonized with a liquid silk skirt.',
    gender: 'women',
    totalPrice: 660,
    hasTurntable: true,
    colors: [
      { name: 'Oatmeal Melange', hex: '#DED5C5', image: '/images/cutout-women-6.png' },
      { name: 'Cloud Grey', hex: '#CBC9C4', image: '/images/cutout-women-3.png' },
      { name: 'Dark Taupe', hex: '#635B50', image: '/images/cutout-women-2.png' },
    ],
    pieces: [
      {
        id: 'w06-sweater',
        name: 'Oversized Chunky Rib Mockneck',
        category: 'Knitwear',
        price: 380,
        image: '/images/runway-women-6.jpg',
        color: 'Oatmeal Melange',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w06-skirt',
        name: 'Liquid Silk Charmeuse Maxi Skirt',
        category: 'Skirts',
        price: 190,
        image: '/images/runway-women-6.jpg',
        color: 'Ivory Sheen',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      {
        id: 'w06-loafers',
        name: 'Lug-Sole Leather Penny Loafers',
        category: 'Footwear',
        price: 90,
        image: '/images/runway-women-6.jpg',
        color: 'Dark Brown',
        sizes: ['6', '7', '8', '9', '10']
      }
    ],
    description: 'Plush ribbed fisherman knit spun from 4-ply Peruvian alpaca and wool blend, casually draped over fluid silk charmeuse.',
    fabricCare: '70% Wool, 30% Baby Alpaca. Skirt: 100% Silk. Hand wash cold with wool detergent.',
    sizeFit: 'Generous relaxed fit on sweater. Skirt is bias-cut to glide over curves.',
    shippingReturns: 'Free standard shipping on orders over $150.'
  }
];

export const RUNWAY_LOOKS_MEN: RunwayLook[] = [
  {
    id: 'look-m-01',
    number: '01 / 06',
    title: 'The Sand Dune Double-Breasted Suit',
    tagline: 'Six looks, styled head to toe. Tap anyone in the line to bring them forward.',
    gender: 'men',
    totalPrice: 980,
    hasTurntable: true,
    colors: [
      { name: 'Sand Dune Tan', hex: '#D4C4AE', image: '/images/cutout-men-1.png' },
      { name: 'Desert Taupe', hex: '#B8A590', image: '/images/cutout-men-3.png' },
      { name: 'Charcoal Black', hex: '#21201E', image: '/images/cutout-men-4.png' },
    ],
    pieces: [
      {
        id: 'm01-jacket',
        name: '6-Button Double-Breasted Wool Blazer',
        category: 'Suits & Blazers',
        price: 620,
        image: '/images/runway-men-1.png',
        color: 'Sand Dune Tan',
        sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)']
      },
      {
        id: 'm01-trouser',
        name: 'Double-Pleated Sartorial Trouser',
        category: 'Trousers',
        price: 240,
        image: '/images/runway-men-1.png',
        color: 'Sand Dune Tan',
        sizes: ['30', '32', '34', '36', '38']
      },
      {
        id: 'm01-loafer',
        name: 'Blake-Stitched Suede Penny Loafers',
        category: 'Footwear',
        price: 120,
        image: '/images/runway-men-1.png',
        color: 'Snuff Suede',
        sizes: ['8', '9', '10', '11', '12']
      }
    ],
    description: 'Crafted from Super 150s Loro Piana virgin wool with genuine full-canvas horsehair chest construction for unmatched drape.',
    fabricCare: '100% Super 150s Italian Wool. Dry clean only by garment specialist.',
    sizeFit: 'Model is 6\'1" (185cm) wearing 40R / 32W. Tailored athletic drop-7 cut.',
    shippingReturns: 'Free express shipping on all orders over $150. Free 30-day returns.'
  },
  {
    id: 'look-m-02',
    number: '02 / 06',
    title: 'Espresso Cashmere Overcoat & Rollneck',
    tagline: 'Rich autumnal tones tailored with unconstructed Neapolitan soft shoulders.',
    gender: 'men',
    totalPrice: 1120,
    hasTurntable: true,
    colors: [
      { name: 'Espresso Roast', hex: '#3B2C24', image: '/images/cutout-men-2.png' },
      { name: 'Camel Tan', hex: '#B89264', image: '/images/cutout-men-1.png' },
      { name: 'Slate Grey', hex: '#4A4C50', image: '/images/cutout-men-4.png' },
    ],
    pieces: [
      {
        id: 'm02-coat',
        name: 'Pure Cashmere Single-Breasted Overcoat',
        category: 'Coats & Outerwear',
        price: 740,
        image: '/images/runway-men-2.jpg',
        color: 'Espresso Roast',
        sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)']
      },
      {
        id: 'm02-knit',
        name: 'Merino Wool Fine Rollneck',
        category: 'Knitwear',
        price: 210,
        image: '/images/runway-men-2.jpg',
        color: 'Cocoa Brown',
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        id: 'm02-boots',
        name: 'Goodyear-Welted Leather Chelsea Boots',
        category: 'Footwear',
        price: 170,
        image: '/images/runway-men-2.jpg',
        color: 'Dark Burgundy',
        sizes: ['8', '9', '10', '11', '12']
      }
    ],
    description: 'Substantial 520 GSM Mongolian cashmere overcoat. Unconstructed shoulders with subtle shirt-sleeve spalla camicia gathering.',
    fabricCare: '100% Cashmere. Horn button closures. Specialist dry clean.',
    sizeFit: 'Cut generously to comfortably layer over suits or thick sweaters.',
    shippingReturns: 'Complimentary shipping & 30-day returns.'
  },
  {
    id: 'look-m-03',
    number: '03 / 06',
    title: 'Oatmeal Wool Polo Cardigan & Slacks',
    tagline: 'Casual sartorialism combining waffle texture, mother-of-pearl, and relaxed trousers.',
    gender: 'men',
    totalPrice: 650,
    hasTurntable: false,
    colors: [
      { name: 'Oatmeal Heather', hex: '#D7CDC1', image: '/images/cutout-men-3.png' },
      { name: 'Moss Green', hex: '#4A5B49', image: '/images/cutout-men-2.png' },
      { name: 'Charcoal Black', hex: '#1E1E1C', image: '/images/cutout-men-4.png' },
    ],
    pieces: [
      {
        id: 'm03-cardigan',
        name: 'Milano-Stitch Wool Polo Cardigan',
        category: 'Knitwear',
        price: 320,
        image: '/images/runway-men-3.jpg',
        color: 'Oatmeal Heather',
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        id: 'm03-trouser',
        name: 'Single-Pleat Flannel Dress Trouser',
        category: 'Trousers',
        price: 210,
        image: '/images/runway-men-3.jpg',
        color: 'Grey Flannel',
        sizes: ['30', '32', '34', '36', '38']
      },
      {
        id: 'm03-shoes',
        name: 'Calfskin Minimal Derby Shoes',
        category: 'Footwear',
        price: 120,
        image: '/images/runway-men-3.jpg',
        color: 'Oxblood Black',
        sizes: ['8', '9', '10', '11', '12']
      }
    ],
    description: 'Dense Milano knit retains crisp jacket-like structure while offering the effortless comfort of knitwear. Genuine Australian shell buttons.',
    fabricCare: '100% Extra-Fine Australian Merino Wool. Hand wash cold or dry clean.',
    sizeFit: 'True to size. Straight cut through the torso.',
    shippingReturns: 'Free standard shipping on orders over $150.'
  },
  {
    id: 'look-m-04',
    number: '04 / 06',
    title: 'Charcoal Minimalist Sartorial Overcoat',
    tagline: 'Monochrome precision with razor-sharp lapels and pure wool gabardine.',
    gender: 'men',
    totalPrice: 930,
    hasTurntable: true,
    colors: [
      { name: 'Charcoal Slate', hex: '#373A3E', image: '/images/cutout-men-4.png' },
      { name: 'Midnight Jet', hex: '#191A1C', image: '/images/cutout-men-5.png' },
      { name: 'Camel Tan', hex: '#B99368', image: '/images/cutout-men-1.png' },
    ],
    pieces: [
      {
        id: 'm04-coat',
        name: 'Covert Wool Raglan Overcoat',
        category: 'Coats & Outerwear',
        price: 580,
        image: '/images/runway-men-4.jpg',
        color: 'Charcoal Slate',
        sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)']
      },
      {
        id: 'm04-pants',
        name: 'Tapered Virgin Wool Trousers',
        category: 'Trousers',
        price: 220,
        image: '/images/runway-men-4.jpg',
        color: 'Charcoal Slate',
        sizes: ['30', '32', '34', '36', '38']
      },
      {
        id: 'm04-scarf',
        name: 'Brushed Cashmere Fringe Scarf',
        category: 'Accessories',
        price: 130,
        image: '/images/runway-men-4.jpg',
        color: 'Heather Smoke',
        sizes: ['One Size']
      }
    ],
    description: 'English covert cloth wool known for durability and natural weather repelling. Raglan sleeve cut allows effortless movement.',
    fabricCare: '100% British Wool. Full Bemberg lining. Dry clean only.',
    sizeFit: 'Clean architectural cut with comfortable shoulder drape.',
    shippingReturns: 'Complimentary shipping worldwide.'
  },
  {
    id: 'look-m-05',
    number: '05 / 06',
    title: 'The Sartoriale Bespoke Navy Suit',
    tagline: 'Savile Row inspired two-piece cut from Super 160s Vitale Barberis Canonico wool.',
    gender: 'men',
    totalPrice: 1250,
    hasTurntable: true,
    colors: [
      { name: 'Bespoke Navy', hex: '#1C2938', image: '/images/cutout-men-5.png' },
      { name: 'Anthracite Charcoal', hex: '#2B2E33', image: '/images/cutout-men-4.png' },
      { name: 'Sand Beige', hex: '#D5C5B0', image: '/images/cutout-men-1.png' },
    ],
    pieces: [
      {
        id: 'm05-suit',
        name: 'Vitale Barberis 2-Piece Bespoke Suit',
        category: 'Suits & Blazers',
        price: 920,
        image: '/images/runway-men-5.png',
        color: 'Bespoke Navy',
        sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)']
      },
      {
        id: 'm05-shirt',
        name: 'Giza 87 Two-Ply Poplin Shirt',
        category: 'Shirts',
        price: 210,
        image: '/images/rack-shirt-clean.png',
        color: 'Crisp White',
        sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)']
      },
      {
        id: 'm05-tie',
        name: 'Grenadine 7-Fold Silk Necktie',
        category: 'Accessories',
        price: 120,
        image: '/images/runway-men-5.png',
        color: 'Navy Weave',
        sizes: ['Standard 8cm']
      }
    ],
    description: 'Hand-sewn milanese buttonhole, floating horsehair canvas chest piece, and hand-finished pick stitching throughout all seams.',
    fabricCare: '100% Super 160s Virgin Wool. Specialist dry clean.',
    sizeFit: 'Drop-7 silhouette. Complimentary in-store or virtual tailoring alterations.',
    shippingReturns: 'Bespoke garment bag and cedar hanger included. Free 30-day returns.'
  },
  {
    id: 'look-m-06',
    number: '06 / 06',
    title: 'Imperial Hand-Embroidered Raw Silk Sherwani',
    tagline: 'Royal Indian ceremonial ensemble embellished with real gold bullion zardozi needlework.',
    gender: 'men',
    totalPrice: 1680,
    hasTurntable: true,
    colors: [
      { name: 'Antique Gold Cream', hex: '#E2D1B2', image: '/images/cutout-men-6.png' },
      { name: 'Regal Ruby Red', hex: '#631B22', image: '/images/cutout-men-2.png' },
      { name: 'Midnight Royal Black', hex: '#1C1B1A', image: '/images/cutout-men-4.png' },
    ],
    pieces: [
      {
        id: 'm06-sherwani',
        name: 'Royal Heritage Raw Silk Sherwani',
        category: 'Wedding & Ethnic',
        price: 1180,
        image: '/images/runway-men-6.png',
        color: 'Antique Gold Cream',
        sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', 'Custom Fit']
      },
      {
        id: 'm06-churidar',
        name: 'Pure Mulberry Silk Churidar & Kurta',
        category: 'Wedding & Ethnic',
        price: 280,
        image: '/images/runway-men-6.png',
        color: 'Tonal Ivory',
        sizes: ['30-34', '36-40', 'Custom']
      },
      {
        id: 'm06-stole',
        name: 'Pashmina Zari Embroidered Doshala Stole',
        category: 'Accessories',
        price: 220,
        image: '/images/runway-men-6.png',
        color: 'Gold Brocade',
        sizes: ['2.5m Royal Length']
      }
    ],
    description: 'Masterfully hand-embroidered by 4th-generation master artisans using French metallic bullion threads, seed pearls, and genuine Banarasi gold zari on handwoven raw silk.',
    fabricCare: '100% Pure Handloom Raw Silk. Heritage garment — store in breathable cotton muslin cover.',
    sizeFit: 'Custom tailored to individual measurements or standard sizing. Includes matching safa turban upon request.',
    shippingReturns: 'Insured luxury white-glove shipping worldwide. Custom sizing consultation included.'
  }
];
