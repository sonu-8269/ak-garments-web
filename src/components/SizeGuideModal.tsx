import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [activeTab, setActiveTab] = useState<'suits' | 'shirts' | 'sherwanis'>('suits');

  const suitChart = [
    { size: '36S / 36R', chest: unit === 'inches' ? '36 - 37"' : '91 - 94 cm', waist: unit === 'inches' ? '30 - 31"' : '76 - 79 cm', shoulder: unit === 'inches' ? '17.5"' : '44.5 cm' },
    { size: '38S / 38R', chest: unit === 'inches' ? '38 - 39"' : '96 - 99 cm', waist: unit === 'inches' ? '32 - 33"' : '81 - 84 cm', shoulder: unit === 'inches' ? '18.0"' : '45.7 cm' },
    { size: '40R / 40L', chest: unit === 'inches' ? '40 - 41"' : '101 - 104 cm', waist: unit === 'inches' ? '34 - 35"' : '86 - 89 cm', shoulder: unit === 'inches' ? '18.5"' : '47.0 cm' },
    { size: '42R / 42L', chest: unit === 'inches' ? '42 - 43"' : '106 - 109 cm', waist: unit === 'inches' ? '36 - 37"' : '91 - 94 cm', shoulder: unit === 'inches' ? '19.0"' : '48.2 cm' },
    { size: '44R / 44L', chest: unit === 'inches' ? '44 - 45"' : '111 - 114 cm', waist: unit === 'inches' ? '38 - 39"' : '96 - 99 cm', shoulder: unit === 'inches' ? '19.5"' : '49.5 cm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div
        className="fixed inset-0 bg-[#20201E]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm shadow-2xl z-10 animate-fade-in overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#DFD7CB] bg-[#F7F3ED] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#B89562]" />
            <h3 className="font-serif text-2xl font-medium text-[#20201E]">
              Atelier Size & Metric Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#E8DED1] text-[#20201E]"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Controls: Unit toggle & Category selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFD7CB] pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('suits')}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider rounded-sm ${
                  activeTab === 'suits' ? 'bg-[#20201E] text-white' : 'text-[#52504C] hover:bg-[#E8DED1]'
                }`}
              >
                Tailored Suits
              </button>
              <button
                onClick={() => setActiveTab('shirts')}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider rounded-sm ${
                  activeTab === 'shirts' ? 'bg-[#20201E] text-white' : 'text-[#52504C] hover:bg-[#E8DED1]'
                }`}
              >
                Dress Shirts
              </button>
              <button
                onClick={() => setActiveTab('sherwanis')}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider rounded-sm ${
                  activeTab === 'sherwanis' ? 'bg-[#20201E] text-white' : 'text-[#52504C] hover:bg-[#E8DED1]'
                }`}
              >
                Royal Sherwanis
              </button>
            </div>

            <div className="flex items-center gap-1 bg-[#E8DED1] p-0.5 rounded text-xs self-start sm:self-auto font-sans">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded ${unit === 'inches' ? 'bg-[#20201E] text-white font-medium' : 'text-[#52504C]'}`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded ${unit === 'cm' ? 'bg-[#20201E] text-white font-medium' : 'text-[#52504C]'}`}
              >
                Centimetres
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#DFD7CB] text-[#7A7771] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Size Label</th>
                  <th className="py-2.5 px-3">Chest Circumference</th>
                  <th className="py-2.5 px-3">Natural Waist</th>
                  <th className="py-2.5 px-3">Shoulder Width</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFD7CB]/60">
                {suitChart.map((row, i) => (
                  <tr key={i} className="hover:bg-[#F7F3ED]/80">
                    <td className="py-3 px-3 font-semibold text-[#20201E]">{row.size}</td>
                    <td className="py-3 px-3 text-[#52504C]">{row.chest}</td>
                    <td className="py-3 px-3 text-[#52504C]">{row.waist}</td>
                    <td className="py-3 px-3 text-[#52504C]">{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measurement Advice */}
          <div className="p-4 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm space-y-2 text-xs font-sans text-[#52504C]">
            <div className="font-semibold text-[#20201E] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#B89562]" />
              <span>How To Take Accurate Measurements:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
              <li><strong>Chest:</strong> Wrap tape under armpits around the fullest part of your chest with relaxed breath.</li>
              <li><strong>Waist:</strong> Measure at your natural waistline, level with your navel.</li>
              <li><strong>Shoulder:</strong> Measure across the back from the tip of one shoulder bone to the other.</li>
              <li><strong>Complimentary Alterations:</strong> Every garment purchased includes 30 days of complimentary tailoring adjustments.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
