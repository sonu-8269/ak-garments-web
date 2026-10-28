import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onOpenTailoring: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSizeGuide,
  onOpenTailoring,
  onSelectCategory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#20201E] text-[#F7F3ED] pt-16 sm:pt-24 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Newsletter & Brand Statement Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89562] font-semibold font-sans">
              The AK Garments Private Journal
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Join Our Sartorial Circle
            </h3>
            <p className="text-xs text-zinc-400 font-light max-w-md">
              Receive private salon invitations, new fabric mill releases, and bespoke styling dossiers before public revelation.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded-sm text-xs font-sans focus:outline-none focus:border-[#B89562]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B89562] text-[#20201E] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1.5 font-sans">
                <Check className="w-3.5 h-3.5" />
                <span>You have been registered for our private AK Garments dispatches.</span>
              </div>
            )}
          </div>
        </div>

        {/* Multi-Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs font-sans">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-white uppercase">
                AK GARMENTS
              </span>
              <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-400 mt-0.5">
                Haute Couture & Tailoring
              </span>
            </div>
            <p className="text-zinc-400 font-light text-[11px] leading-relaxed max-w-sm">
              Dedicated to preserving the noble traditions of Savile Row hand-drafted tailoring, Italian floating canvas jackets, and imperial Indian matrimonial regalia.
            </p>
            <div className="space-y-1.5 text-zinc-400 text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B89562]" />
                <span>Flagship Store: 18 Mayfair / Connaught Place</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B89562]" />
                <span>Concierge: +1 (800) 452-8354</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B89562]" />
                <span>concierge@akgarments.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Menswear */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-widest uppercase text-[#B89562]">
              Menswear
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={() => onSelectCategory('men')} className="hover:text-white transition-colors">Super 150s Suits</button></li>
              <li><button onClick={() => onSelectCategory('men')} className="hover:text-white transition-colors">Poplin Dress Shirts</button></li>
              <li><button onClick={() => onSelectCategory('men')} className="hover:text-white transition-colors">Merino Knitwear</button></li>
              <li><button onClick={() => onSelectCategory('men')} className="hover:text-white transition-colors">Pleated Trousers</button></li>
              <li><button onClick={() => onSelectCategory('men')} className="hover:text-white transition-colors">Suede Italian Loafers</button></li>
            </ul>
          </div>

          {/* Column 3: Womenswear & Wedding */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-widest uppercase text-[#B89562]">
              Ceremonial
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={() => onSelectCategory('wedding')} className="hover:text-white transition-colors">Royal Ivory Sherwanis</button></li>
              <li><button onClick={() => onSelectCategory('wedding')} className="hover:text-white transition-colors">Groom Safas & Turbans</button></li>
              <li><button onClick={() => onSelectCategory('wedding')} className="hover:text-white transition-colors">Black Tie Tuxedos</button></li>
              <li><button onClick={() => onSelectCategory('women')} className="hover:text-white transition-colors">Linen Double-Breasted</button></li>
              <li><button onClick={() => onSelectCategory('women')} className="hover:text-white transition-colors">Silk Evening Ensembles</button></li>
            </ul>
          </div>

          {/* Column 4: Client Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm tracking-widest uppercase text-[#B89562]">
              Client Services
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={onOpenTailoring} className="hover:text-white transition-colors text-[#B89562] font-semibold">Book Custom Fitting</button></li>
              <li><button onClick={onOpenSizeGuide} className="hover:text-white transition-colors">Size & Measurement Guide</button></li>
              <li><span className="hover:text-white cursor-pointer">Complimentary Alterations</span></li>
              <li><span className="hover:text-white cursor-pointer">Worldwide Express Courier</span></li>
              <li><span className="hover:text-white cursor-pointer">Garment Care Manual</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-sans gap-4">
          <div>
            © 2026 AK GARMENTS S.p.A. All rights reserved. Registered Haute Couture & Bespoke Tailoring House.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-zinc-300 cursor-pointer">Sartorial Authenticity</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
