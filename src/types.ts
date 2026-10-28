export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'men' | 'women' | 'ethnic' | 'wedding' | 'tailoring';
  subCategory: string;
  price: number;
  originalPrice?: number;
  tag?: string; // e.g. "NEW", "ONLY 3 LEFT", "-20%", "BESPOKE"
  image: string;
  backImage: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  description: string;
  details: string[];
  inStock: boolean;
  rackFeatured?: boolean;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  id: string; // unique item id (product.id + size + color)
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface TailoringSelection {
  garmentType: string;
  fabric: {
    id: string;
    name: string;
    material: string;
    origin: string;
    color: string;
    price: number;
    image: string;
  };
  fit: string;
  collar: string;
  cuff: string;
  lapel: string;
  buttons: string;
  lining: string;
  monogram: string;
  measurements: {
    unit: 'inches' | 'cm';
    chest: number;
    waist: number;
    shoulder: number;
    sleeveLength: number;
    trouserLength: number;
    neck: number;
  };
  serviceType: 'home-tailor' | 'studio-visit' | 'self-measure';
  appointmentDate?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
}

export interface RunwayPiece {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  color: string;
  sizes: string[];
}

export interface RunwayColorVariant {
  name: string;
  hex: string;
  image: string;
}

export interface RunwayLook {
  id: string;
  number: string;
  title: string;
  tagline: string;
  gender: 'women' | 'men';
  totalPrice: number;
  colors: RunwayColorVariant[];
  pieces: RunwayPiece[];
  description: string;
  fabricCare: string;
  sizeFit: string;
  shippingReturns: string;
  hasTurntable?: boolean;
}
