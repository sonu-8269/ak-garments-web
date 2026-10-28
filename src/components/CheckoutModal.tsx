import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Lock, Sparkles, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Address
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Sonu Kushwaha',
    email: 'client@atelierandco.com',
    phone: '+91 98765 43210',
    address: '42 Heritage Boulevard, Sartorial Enclave',
    city: 'New Delhi',
    state: 'Delhi',
    zipCode: '110001',
    country: 'India',
  });

  const [shippingMethod, setShippingMethod] = useState<'express' | 'standard'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [orderRef, setOrderRef] = useState<string>('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal; // complimentary shipping

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `ATL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedOrder);
    setStep(4);
    onClearCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B89562', '#31443A', '#20201E', '#FAF8F4'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div
        className="fixed inset-0 bg-[#20201E]/60 backdrop-blur-sm transition-opacity"
        onClick={step === 4 ? onClose : undefined}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF8F4] border border-[#DFD7CB] rounded-sm shadow-2xl z-10 animate-fade-in overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#DFD7CB] bg-[#F7F3ED] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#B89562]" />
            <span className="font-serif text-lg font-medium text-[#20201E]">
              {step === 4 ? 'Order Confirmation' : 'Secure Atelier Checkout'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#E8DED1] text-[#20201E]"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (when not completed) */}
        {step < 4 && (
          <div className="px-6 py-2.5 bg-[#E8DED1]/40 border-b border-[#DFD7CB] flex justify-between text-[11px] font-sans text-[#7A7771]">
            <span className={step >= 1 ? 'text-[#20201E] font-semibold' : ''}>1. Shipping</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#20201E] font-semibold' : ''}>2. Delivery</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-[#20201E] font-semibold' : ''}>3. Payment</span>
          </div>
        )}

        <div className="p-6 overflow-y-auto flex-1 font-sans text-xs">
          
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif text-xl text-[#20201E]">
                Where should we deliver your garments?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase text-[#7A7771] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#7A7771] block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#7A7771] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase text-[#7A7771] block mb-1">Delivery Address</label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#7A7771] block mb-1">City</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#7A7771] block mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                    className="w-full p-2.5 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm focus:border-[#B89562] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#DFD7CB]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-[#20201E] text-white uppercase tracking-wider text-xs font-medium rounded-sm hover:bg-[#31443A] flex items-center gap-2"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Shipping Method */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif text-xl text-[#20201E]">
                Select Delivery Experience
              </h4>

              <div className="space-y-3">
                <div
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 border rounded-sm cursor-pointer flex items-center justify-between ${
                    shippingMethod === 'express'
                      ? 'border-[#20201E] bg-[#F7F3ED] ring-1 ring-[#20201E]'
                      : 'border-[#DFD7CB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#B89562]" />
                    <div>
                      <div className="font-medium text-[#20201E]">White-Glove Express Delivery</div>
                      <div className="text-[11px] text-[#7A7771]">Delivered in luxury cedar garment bags with wooden hanger</div>
                    </div>
                  </div>
                  <span className="font-semibold text-emerald-800 uppercase text-[10px]">Complimentary</span>
                </div>

                <div
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 border rounded-sm cursor-pointer flex items-center justify-between ${
                    shippingMethod === 'standard'
                      ? 'border-[#20201E] bg-[#F7F3ED] ring-1 ring-[#20201E]'
                      : 'border-[#DFD7CB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#7A7771]" />
                    <div>
                      <div className="font-medium text-[#20201E]">Atelier Studio Collection</div>
                      <div className="text-[11px] text-[#7A7771]">Private fitting & collection at our salon</div>
                    </div>
                  </div>
                  <span className="font-semibold text-emerald-800 uppercase text-[10px]">Free</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-[#DFD7CB]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-[#20201E] text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-[#20201E] text-white uppercase tracking-wider text-xs font-medium rounded-sm hover:bg-[#31443A] flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method */}
          {step === 3 && (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <h4 className="font-serif text-xl text-[#20201E]">
                Payment Option
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card' },
                  { id: 'upi', label: 'UPI / NetBanking' },
                  { id: 'cod', label: 'Cash on Delivery' },
                ].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`p-3 text-center border rounded-sm ${
                      paymentMethod === p.id
                        ? 'border-[#20201E] bg-[#F7F3ED] font-semibold text-[#20201E]'
                        : 'border-[#DFD7CB] text-[#52504C]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm space-y-3">
                  <div>
                    <label className="text-[10px] uppercase text-[#7A7771] block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8921"
                      defaultValue="4532 8920 1827 8921"
                      className="w-full p-2 bg-white border border-[#DFD7CB] rounded-sm font-mono text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase text-[#7A7771] block mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="08/29"
                        className="w-full p-2 bg-white border border-[#DFD7CB] rounded-sm font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-[#7A7771] block mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="•••"
                        defaultValue="894"
                        className="w-full p-2 bg-white border border-[#DFD7CB] rounded-sm font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Amount Recap */}
              <div className="p-3 bg-[#E8DED1]/50 border border-[#DFD7CB] rounded-sm flex justify-between items-center text-xs">
                <span>Total Amount Due:</span>
                <span className="font-serif text-lg font-bold text-[#20201E]">${total}</span>
              </div>

              <div className="flex justify-between pt-4 border-t border-[#DFD7CB]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-[#20201E] text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 bg-[#31443A] text-white uppercase tracking-widest text-xs font-medium rounded-sm hover:bg-[#20201E] shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B89562]" />
                  <span>Place Order (${total})</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Order Confirmation & Receipt */}
          {step === 4 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#31443A] text-white flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89562] font-semibold">
                  Payment Authorized · Order Confirmed
                </span>
                <h3 className="font-serif text-3xl font-normal text-[#20201E]">
                  Thank You For Your Patronage
                </h3>
                <p className="text-xs text-[#52504C]">
                  Order Reference: <strong className="font-mono text-[#20201E]">{orderRef}</strong>
                </p>
              </div>

              <div className="p-4 bg-[#F7F3ED] border border-[#DFD7CB] rounded-sm max-w-sm mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#DFD7CB]/50 pb-1.5">
                  <span className="text-[#7A7771]">Recipient:</span>
                  <span className="font-medium text-[#20201E]">{shippingInfo.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[#DFD7CB]/50 pb-1.5">
                  <span className="text-[#7A7771]">Delivery Address:</span>
                  <span className="font-medium text-[#20201E] text-right truncate max-w-[180px]">
                    {shippingInfo.address}, {shippingInfo.city}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#DFD7CB]/50 pb-1.5">
                  <span className="text-[#7A7771]">Estimated Delivery:</span>
                  <span className="font-medium text-[#31443A]">Within 3 Business Days</span>
                </div>
                <div className="flex justify-between pt-1 font-semibold text-sm">
                  <span>Paid:</span>
                  <span>${total}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#7A7771] max-w-sm mx-auto">
                A confirmation dossier and tracking link has been sent to {shippingInfo.email}.
              </p>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#20201E] text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#31443A] transition-colors"
              >
                Return to Storefront
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
