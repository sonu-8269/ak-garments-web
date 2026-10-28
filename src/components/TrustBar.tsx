import React from 'react';
import { Truck, RotateCcw, Scissors, ShieldCheck, Star } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: <Truck className="w-5 h-5 text-[#B89562]" />,
      title: 'Worldwide Express Shipping',
      desc: 'Complimentary on orders above $150 · White-glove courier',
    },
    {
      icon: <Scissors className="w-5 h-5 text-[#B89562]" />,
      title: '30-Day Atelier Alterations',
      desc: 'Complimentary fit adjustments by our master tailors',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#B89562]" />,
      title: 'Certified Noble Fabrics',
      desc: 'Guaranteed 100% genuine Italian wool & Egyptian cotton',
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-[#B89562]" />,
      title: 'Effortless Home Trial',
      desc: 'Concierge home fittings and discreet returns',
    },
  ];

  const testimonials = [
    {
      quote: "The floating canvas on my sand dune suit is incomparable. It drapes naturally, feeling weightless even after an entire evening gala.",
      client: "Lord Julian M.",
      location: "London & New Delhi",
      rating: 5,
    },
    {
      quote: "Our son's royal wedding sherwani from Atelier & Co. was the crown jewel of the wedding. Generational zardozi embroidery of the highest standard.",
      client: "Princess Gayatri R.",
      location: "Jaipur",
      rating: 5,
    },
    {
      quote: "The interactive 3D rack made it so effortless to inspect the garment cuts from both front and back before booking my bespoke fitting.",
      client: "Marcus Vance",
      location: "Milan",
      rating: 5,
    },
  ];

  return (
    <section className="bg-[#F7F3ED] py-16 sm:py-20 border-b border-[#DFD7CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm shadow-sm">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="p-2.5 rounded-sm bg-[#E8DED1]/50 border border-[#DFD7CB] flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-medium text-[#20201E]">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#7A7771] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Testimonials Carousel / Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89562] font-semibold font-sans">
              Client Commendations
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#20201E]">
              Words from Discerning Patrons
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#B89562]">
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} className="w-3.5 h-3.5 fill-[#B89562]" />
                    ))}
                  </div>
                  <p className="font-serif text-sm italic text-[#52504C] leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DFD7CB]/60">
                  <div className="font-sans text-xs font-semibold text-[#20201E]">
                    {t.client}
                  </div>
                  <div className="text-[10px] text-[#7A7771] font-sans">
                    {t.location} · Verified Patron
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
