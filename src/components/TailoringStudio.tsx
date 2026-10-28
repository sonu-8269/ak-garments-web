import React, { useState } from 'react';
import { Sparkles, Scissors, Check, Calendar, ArrowRight, ArrowLeft, Ruler, ShieldCheck, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FABRICS_DATABASE } from '../data/mockData';
import { TailoringSelection, Product } from '../types';

interface TailoringStudioProps {
  initialProduct?: Product | null;
  onClose?: () => void;
}

export const TailoringStudio: React.FC<TailoringStudioProps> = ({
  initialProduct,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [garmentType, setGarmentType] = useState<string>(
    initialProduct?.name.includes('Sherwani')
      ? 'Royal Wedding Sherwani'
      : initialProduct?.name.includes('Shirt')
      ? 'Luxury Poplin Dress Shirt'
      : 'Bespoke 3-Piece Suit'
  );

  const [selectedFabric, setSelectedFabric] = useState(FABRICS_DATABASE[0]);
  const [fit, setFit] = useState<string>('Sartorial Classic (Balanced)');
  const [collar, setCollar] = useState<string>('English Spread Collar');
  const [cuff, setCuff] = useState<string>('French Double Cuff (Cufflinks)');
  const [lapel, setLapel] = useState<string>('Peak Lapel with Milanese Buttonhole');
  const [buttons, setButtons] = useState<string>('Natural Buffalo Horn');
  const [lining, setLining] = useState<string>('Archival Silk Paisley');
  const [monogram, setMonogram] = useState<string>('A.K.');

  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [measurements, setMeasurements] = useState({
    chest: 40,
    waist: 34,
    shoulder: 18.5,
    sleeveLength: 25.5,
    trouserLength: 41,
    neck: 16,
  });

  const [serviceType, setServiceType] = useState<'home-tailor' | 'studio-visit' | 'self-measure'>('home-tailor');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-11-05');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [submittedBooking, setSubmittedBooking] = useState<string | null>(null);

  const garmentOptions = [
    {
      title: 'Bespoke 3-Piece Suit',
      basePrice: 850,
      turnaround: '14-21 days',
      desc: 'Jacket, waistcoat and pleated trousers with full floating horsehair canvas.',
      image: '/images/bespoke-italian-suit.png',
    },
    {
      title: 'Luxury Poplin Dress Shirt',
      basePrice: 190,
      turnaround: '7-10 days',
      desc: 'Single needle tailoring, split yoke, removable brass stays and mother-of-pearl buttons.',
      image: '/images/clothing-rack-studio.png',
    },
    {
      title: 'Royal Wedding Sherwani',
      basePrice: 1450,
      turnaround: '25-30 days',
      desc: 'Hand-embroidered resham and zari work with churidar and safa coordinates.',
      image: '/images/royal-sherwani-gold.png',
    },
    {
      title: 'Sartorial Pleated Trousers',
      basePrice: 280,
      turnaround: '7-10 days',
      desc: 'Side adjusters, extended waistband, after-dinner split and curtain lining.',
      image: '/images/tailored-suit-sand.png',
    },
    {
      title: 'Black Tie Velvet Tuxedo',
      basePrice: 950,
      turnaround: '14-18 days',
      desc: 'Silk grosgrain facing, jetted pockets and satin side-striped formal trousers.',
      image: '/images/luxury-editorial-duo.png',
    },
  ];

  const currentGarment = garmentOptions.find((g) => g.title === garmentType) || garmentOptions[0];
  const totalPrice = currentGarment.basePrice + selectedFabric.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please provide your name and phone number so the master tailor can coordinate your fitting.');
      return;
    }

    const bookingRef = `AK-GARMENTS-BESPOKE-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedBooking(bookingRef);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B89562', '#31443A', '#20201E', '#E8DED1'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="custom-tailoring-section" className="bg-[#FAF8F4] py-16 sm:py-24 border-b border-[#DFD7CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B89562]/15 text-[#B89562] text-[10px] uppercase tracking-[0.25em] font-sans font-semibold">
            <Scissors className="w-3.5 h-3.5" />
            <span>Made For You · Measured For You</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#20201E]">
            Your Fit. Your Fabric. <br />
            <span className="italic text-[#B89562]">Your Signature.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#52504C] font-light">
            Every garment is hand-drafted by our master tailors. Select your cut, luxury mill fabric, personalization details, and book your fitting consultation.
          </p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-[#DFD7CB] pb-4">
            {[
              { num: 1, label: '01. Garment' },
              { num: 2, label: '02. Fabric' },
              { num: 3, label: '03. Sartorial Details' },
              { num: 4, label: '04. Metrics & Fitting' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`text-left pb-2 transition-all border-b-2 -mb-[18px] ${
                  step === s.num
                    ? 'border-[#20201E] text-[#20201E] font-medium'
                    : step > s.num
                    ? 'border-[#B89562] text-[#B89562]'
                    : 'border-transparent text-zinc-400'
                }`}
              >
                <div className="text-[10px] tracking-wider uppercase font-sans">
                  {s.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Studio Interactive Card */}
        <div className="max-w-5xl mx-auto bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm shadow-luxury overflow-hidden">
          
          {submittedBooking ? (
            /* Booking Confirmation State */
            <div className="p-8 sm:p-14 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#31443A] text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89562] font-sans font-semibold">
                  Bespoke Commission Received
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#20201E]">
                  Your Fitting is Confirmed
                </h3>
                <p className="text-sm text-[#52504C] font-light max-w-md mx-auto">
                  Reference: <span className="font-mono font-bold text-[#20201E]">{submittedBooking}</span>
                </p>
              </div>

              <div className="p-6 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm max-w-md mx-auto text-left text-xs space-y-2 font-sans">
                <div className="flex justify-between border-b border-[#DFD7CB]/60 pb-2">
                  <span className="text-[#7A7771]">Garment:</span>
                  <span className="font-medium text-[#20201E]">{garmentType}</span>
                </div>
                <div className="flex justify-between border-b border-[#DFD7CB]/60 pb-2">
                  <span className="text-[#7A7771]">Fabric:</span>
                  <span className="font-medium text-[#20201E]">{selectedFabric.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#DFD7CB]/60 pb-2">
                  <span className="text-[#7A7771]">Service:</span>
                  <span className="font-medium text-[#20201E] capitalize">{serviceType.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between border-b border-[#DFD7CB]/60 pb-2">
                  <span className="text-[#7A7771]">Scheduled Date:</span>
                  <span className="font-medium text-[#20201E]">{appointmentDate}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-semibold">
                  <span>Estimated Bespoke Total:</span>
                  <span className="text-[#31443A]">₹{totalPrice}</span>
                </div>
              </div>

              <p className="text-xs text-[#7A7771] max-w-md mx-auto">
                Our Head Cutter will contact you at <span className="font-medium text-[#20201E]">{customerPhone}</span> to confirm swatch delivery and measurement coordination.
              </p>

              <button
                onClick={() => {
                  setSubmittedBooking(null);
                  setStep(1);
                  if (onClose) onClose();
                }}
                className="px-8 py-3 bg-[#20201E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#31443A] transition-colors rounded-sm"
              >
                Configure Another Garment
              </button>
            </div>
          ) : (
            /* Multi-step Form Content */
            <div className="p-6 sm:p-10">
              
              {/* STEP 1: Garment Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-[#20201E]">
                        Step 1: Choose Your Garment Silhouette
                      </h3>
                      <p className="text-xs text-[#7A7771]">
                        Select the garment foundation crafted to your personal measurements.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {garmentOptions.map((opt) => (
                      <div
                        key={opt.title}
                        onClick={() => setGarmentType(opt.title)}
                        className={`p-4 border rounded-sm cursor-pointer transition-all flex flex-col justify-between ${
                          garmentType === opt.title
                            ? 'border-[#20201E] bg-[#FAF8F4] shadow-md ring-1 ring-[#20201E]'
                            : 'border-[#DFD7CB] bg-[#F7F3ED] hover:border-[#B89562]'
                        }`}
                      >
                        <div className="aspect-[4/3] rounded-sm overflow-hidden mb-3 bg-[#E8DED1]">
                          <img
                            src={opt.image}
                            alt={opt.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif text-lg font-medium text-[#20201E]">
                              {opt.title}
                            </h4>
                            <span className="font-mono text-xs font-semibold text-[#31443A]">
                              From ₹{opt.basePrice}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#52504C] mt-1 leading-relaxed">
                            {opt.desc}
                          </p>
                          <div className="text-[10px] text-[#B89562] mt-2 font-sans uppercase tracking-wider">
                            Turnaround: {opt.turnaround}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-[#DFD7CB]">
                    <button
                      onClick={() => setStep(2)}
                      className="px-7 py-3 bg-[#20201E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#31443A] transition-colors rounded-sm flex items-center gap-2"
                    >
                      <span>Proceed to Fabrics</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Fabric Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#20201E]">
                      Step 2: Select Your Mill Fabric
                    </h3>
                    <p className="text-xs text-[#7A7771]">
                      Sourced from historic weaving mills in Biella (Italy), Varanasi (India) & Belfast (Ireland).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FABRICS_DATABASE.map((fabric) => (
                      <div
                        key={fabric.id}
                        onClick={() => setSelectedFabric(fabric)}
                        className={`p-4 border rounded-sm cursor-pointer transition-all flex gap-4 items-center ${
                          selectedFabric.id === fabric.id
                            ? 'border-[#20201E] bg-[#FAF8F4] shadow-md ring-1 ring-[#20201E]'
                            : 'border-[#DFD7CB] bg-[#F7F3ED] hover:border-[#B89562]'
                        }`}
                      >
                        <div className="w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 bg-[#E8DED1] border border-[#DFD7CB]">
                          <img
                            src={fabric.image}
                            alt={fabric.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif text-base font-semibold text-[#20201E]">
                              {fabric.name}
                            </h4>
                            <span className="font-mono text-xs font-bold text-[#B89562]">
                              +₹{fabric.price}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#52504C]">{fabric.material}</div>
                          <div className="text-[10px] text-[#7A7771]">Origin: {fabric.origin}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">{fabric.weight}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#DFD7CB]">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 border border-[#20201E] text-xs uppercase tracking-widest font-medium rounded-sm flex items-center gap-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-7 py-3 bg-[#20201E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#31443A] transition-colors rounded-sm flex items-center gap-2"
                    >
                      <span>Proceed to Personalization</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Personalise Design & Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#20201E]">
                      Step 3: Personalise Sartorial Details
                    </h3>
                    <p className="text-xs text-[#7A7771]">
                      Tailor every detail from collar geometry to monogram embroidery.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs font-sans">
                    
                    {/* Fit */}
                    <div className="space-y-2">
                      <label className="font-medium text-[#20201E] block">Cut & Silhouette</label>
                      <select
                        value={fit}
                        onChange={(e) => setFit(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm text-[#20201E] focus:outline-none focus:border-[#B89562]"
                      >
                        <option>Sartorial Classic (Balanced)</option>
                        <option>Italian Slim Cut (Tapered)</option>
                        <option>Modern Relaxed (Spacious)</option>
                      </select>
                    </div>

                    {/* Collar */}
                    <div className="space-y-2">
                      <label className="font-medium text-[#20201E] block">Collar Geometry</label>
                      <select
                        value={collar}
                        onChange={(e) => setCollar(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm text-[#20201E] focus:outline-none focus:border-[#B89562]"
                      >
                        <option>English Spread Collar</option>
                        <option>Cutaway Royal Collar</option>
                        <option>Mandarin / Nehru Band</option>
                        <option>Button-Down Oxford</option>
                      </select>
                    </div>

                    {/* Cuff */}
                    <div className="space-y-2">
                      <label className="font-medium text-[#20201E] block">Cuff Styling</label>
                      <select
                        value={cuff}
                        onChange={(e) => setCuff(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm text-[#20201E] focus:outline-none focus:border-[#B89562]"
                      >
                        <option>French Double Cuff (Cufflinks)</option>
                        <option>Barrel 2-Button Mitered</option>
                        <option>Single Button Rounded</option>
                      </select>
                    </div>

                    {/* Lapel */}
                    <div className="space-y-2">
                      <label className="font-medium text-[#20201E] block">Jacket Lapel Style</label>
                      <select
                        value={lapel}
                        onChange={(e) => setLapel(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm text-[#20201E] focus:outline-none focus:border-[#B89562]"
                      >
                        <option>Peak Lapel with Milanese Buttonhole</option>
                        <option>Classic Notch Lapel (8.5 cm)</option>
                        <option>Silk Satin Shawl Collar</option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-2">
                      <label className="font-medium text-[#20201E] block">Button Material</label>
                      <select
                        value={buttons}
                        onChange={(e) => setButtons(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm text-[#20201E] focus:outline-none focus:border-[#B89562]"
                      >
                        <option>Natural Buffalo Horn</option>
                        <option>Australian Mother-of-Pearl</option>
                        <option>Burnished Antique Brass</option>
                        <option>Fabric-Covered Velvet</option>
                      </select>
                    </div>

                    {/* Monogram */}
                    <div className="space-y-2">
                      <label className="font-medium text-[#20201E] block">Monogram Initials (Optional)</label>
                      <input
                        type="text"
                        value={monogram}
                        maxLength={5}
                        onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                        placeholder="e.g. A.K."
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm text-[#20201E] uppercase font-mono tracking-widest focus:outline-none focus:border-[#B89562]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#DFD7CB]">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 border border-[#20201E] text-xs uppercase tracking-widest font-medium rounded-sm flex items-center gap-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-7 py-3 bg-[#20201E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#31443A] transition-colors rounded-sm flex items-center gap-2"
                    >
                      <span>Proceed to Measurements & Booking</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Measurements, Consultation & Submission */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#20201E]">
                      Step 4: Provide Metrics & Schedule Fitting
                    </h3>
                    <p className="text-xs text-[#7A7771]">
                      Choose how you would like our Master Cutter to capture your measurements.
                    </p>
                  </div>

                  {/* Service Type Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'home-tailor',
                        title: 'Master Tailor Home Visit',
                        desc: 'Our head cutter visits your residence with fabric swatches.',
                      },
                      {
                        id: 'studio-visit',
                        title: 'AK Garments Studio Appointment',
                        desc: 'Visit our flagship atelier salon for private champagne fitting.',
                      },
                      {
                        id: 'self-measure',
                        title: 'Input My Measurements',
                        desc: 'Submit your exact body metrics directly into our digital pattern system.',
                      },
                    ].map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => setServiceType(srv.id as any)}
                        className={`p-3.5 border rounded-sm cursor-pointer transition-all ${
                          serviceType === srv.id
                            ? 'border-[#20201E] bg-[#FAF8F4] shadow-sm ring-1 ring-[#20201E]'
                            : 'border-[#DFD7CB] bg-[#F7F3ED] hover:border-[#B89562]'
                        }`}
                      >
                        <div className="font-serif text-base font-medium text-[#20201E]">
                          {srv.title}
                        </div>
                        <p className="text-[11px] text-[#52504C] mt-1">{srv.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Guided Measurement Inputs if Self-Measure or Optional */}
                  <div className="p-4 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#20201E] uppercase tracking-wider flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-[#B89562]" />
                        <span>Body Metrics Form</span>
                      </span>
                      <div className="flex items-center gap-1 bg-[#E8DED1] p-0.5 rounded text-[10px]">
                        <button
                          type="button"
                          onClick={() => setUnit('inches')}
                          className={`px-2 py-0.5 rounded ${
                            unit === 'inches' ? 'bg-[#20201E] text-white font-medium' : 'text-[#52504C]'
                          }`}
                        >
                          Inches
                        </button>
                        <button
                          type="button"
                          onClick={() => setUnit('cm')}
                          className={`px-2 py-0.5 rounded ${
                            unit === 'cm' ? 'bg-[#20201E] text-white font-medium' : 'text-[#52504C]'
                          }`}
                        >
                          Centimetres
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] text-[#7A7771] block mb-1">Chest ({unit})</label>
                        <input
                          type="number"
                          value={measurements.chest}
                          onChange={(e) => setMeasurements({ ...measurements, chest: Number(e.target.value) })}
                          className="w-full p-2 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#7A7771] block mb-1">Waist ({unit})</label>
                        <input
                          type="number"
                          value={measurements.waist}
                          onChange={(e) => setMeasurements({ ...measurements, waist: Number(e.target.value) })}
                          className="w-full p-2 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#7A7771] block mb-1">Shoulders ({unit})</label>
                        <input
                          type="number"
                          value={measurements.shoulder}
                          onChange={(e) => setMeasurements({ ...measurements, shoulder: Number(e.target.value) })}
                          className="w-full p-2 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#7A7771] block mb-1">Sleeve ({unit})</label>
                        <input
                          type="number"
                          value={measurements.sleeveLength}
                          onChange={(e) => setMeasurements({ ...measurements, sleeveLength: Number(e.target.value) })}
                          className="w-full p-2 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#7A7771] block mb-1">Inseam ({unit})</label>
                        <input
                          type="number"
                          value={measurements.trouserLength}
                          onChange={(e) => setMeasurements({ ...measurements, trouserLength: Number(e.target.value) })}
                          className="w-full p-2 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#7A7771] block mb-1">Neck ({unit})</label>
                        <input
                          type="number"
                          value={measurements.neck}
                          onChange={(e) => setMeasurements({ ...measurements, neck: Number(e.target.value) })}
                          className="w-full p-2 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Customer Information & Appointment Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                    <div>
                      <label className="font-medium text-[#20201E] block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Singh"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[#20201E] block mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[#20201E] block mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="client@akgarments.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[#20201E] block mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                      />
                    </div>
                  </div>

                  {/* Order Summary & Pricing Calculation */}
                  <div className="p-4 bg-[#E8DED1]/50 rounded-sm border border-[#DFD7CB] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#52504C]">
                        Selected: <strong className="text-[#20201E]">{garmentType}</strong> in{' '}
                        <strong className="text-[#20201E]">{selectedFabric.name}</strong>
                      </div>
                      <div className="text-[11px] text-[#7A7771]">
                        Includes 2 bespoke fittings, pattern archival, and 30-day complimentary alterations.
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#7A7771] uppercase tracking-wider">Estimated Quote</div>
                      <div className="font-serif text-3xl font-bold text-[#31443A]">₹{totalPrice}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#DFD7CB]">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 border border-[#20201E] text-xs uppercase tracking-widest font-medium rounded-sm flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#31443A] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#20201E] transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Sparkles className="w-4 h-4 text-[#B89562]" />
                      <span>Book Bespoke Fitting Consultation</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
