import React, { useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  QrCode,
  Building,
  Wallet,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  Ticket,
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutView: React.FC = () => {
  const {
    activeMovie,
    activeCinema,
    activeShowtime,
    selectedSeatIds,
    selectedSnacks,
    user,
    confirmBooking,
    cancelCurrentBookingFlow,
    showToast
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<
    'Skill Credits' | 'UPI' | 'Credit/Debit Card' | 'NetBanking'
  >('UPI');
  const [applySkillCredits, setApplySkillCredits] = useState(true);
  const [upiId, setUpiId] = useState('sarah.jenkins@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('781');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!activeMovie || !activeCinema || !activeShowtime || selectedSeatIds.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-neutral-400">Booking session expired or empty.</p>
        <button
          onClick={cancelCurrentBookingFlow}
          className="mt-4 px-4 py-2 bg-neutral-800 text-white rounded-lg text-xs"
        >
          Return to Movies
        </button>
      </div>
    );
  }

  // Calculate ticket amount
  let ticketTotal = 0;
  selectedSeatIds.forEach((seatId) => {
    const row = seatId.charAt(0);
    if (row === 'A' || row === 'B') ticketTotal += activeShowtime.pricing.platinum;
    else if (row === 'C' || row === 'D' || row === 'E' || row === 'F') ticketTotal += activeShowtime.pricing.gold;
    else ticketTotal += activeShowtime.pricing.silver;
  });

  const snackTotal = selectedSnacks.reduce((sum, s) => sum + s.item.price * s.quantity, 0);
  const convenienceFee = Math.round(selectedSeatIds.length * 35);
  const taxes = Math.round((ticketTotal + convenienceFee) * 0.05);
  const rawGrandTotal = ticketTotal + snackTotal + convenienceFee + taxes;

  // Credits calculation
  const creditsAvailable = user.skillCredits;
  const creditsToDeduct = applySkillCredits
    ? Math.min(creditsAvailable, rawGrandTotal)
    : 0;

  const finalAmountToPay = rawGrandTotal - creditsToDeduct;

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      try {
        const selectedMethod = finalAmountToPay === 0 ? 'Skill Credits' : paymentMethod;
        confirmBooking(selectedMethod, creditsToDeduct);
      } catch (err: any) {
        showToast(err.message || 'Payment processing failed', 'error');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Link */}
        <button
          onClick={cancelCurrentBookingFlow}
          className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Seat Selection
        </button>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-850 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-display">
              Review & Secure Checkout
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Instant digital M-Ticket issued immediately upon completion
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encrypted & JWT Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Payment Methods & Skill Credits (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* SkillWallet Credits Box */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/30 via-neutral-900 to-neutral-900 border border-amber-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      SkillWallet Credits
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Balance: <strong className="text-amber-300 font-mono">{user.skillCredits} Credits</strong> (1 Credit = ₹1)
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applySkillCredits}
                    onChange={(e) => setApplySkillCredits(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 bg-neutral-950 border-neutral-700 focus:ring-rose-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-neutral-200">
                    Apply Credits
                  </span>
                </label>
              </div>

              {applySkillCredits && creditsToDeduct > 0 && (
                <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs flex items-center justify-between">
                  <span className="text-neutral-400">
                    Applying {creditsToDeduct} credits to this booking:
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">
                    - ₹{creditsToDeduct}
                  </span>
                </div>
              )}
            </div>

            {/* Payment Method Selector (if remaining amount > 0) */}
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-300">
                {finalAmountToPay === 0 ? 'Payment Covered by Skill Credits' : 'Choose Payment Gateway'}
              </h3>

              {finalAmountToPay > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      paymentMethod === 'UPI'
                        ? 'bg-rose-950/30 border-rose-500 text-white font-semibold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-rose-400" />
                    <span className="text-xs block">UPI / QR</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('Credit/Debit Card')}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      paymentMethod === 'Credit/Debit Card'
                        ? 'bg-rose-950/30 border-rose-500 text-white font-semibold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                    <span className="text-xs block">Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('NetBanking')}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      paymentMethod === 'NetBanking'
                        ? 'bg-rose-950/30 border-rose-500 text-white font-semibold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Building className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                    <span className="text-xs block">NetBanking</span>
                  </button>
                </div>
              )}

              {/* UPI Option */}
              {finalAmountToPay > 0 && paymentMethod === 'UPI' && (
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Pay with Google Pay, PhonePe, Paytm or any UPI App</span>
                    <span className="text-emerald-400 font-semibold">Instant Approval</span>
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-500">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>A payment request will be sent to your UPI app upon clicking Pay</span>
                  </div>
                </div>
              )}

              {/* Card Option */}
              {finalAmountToPay > 0 && paymentMethod === 'Credit/Debit Card' && (
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">
                        Valid Thru (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NetBanking Option */}
              {finalAmountToPay > 0 && paymentMethod === 'NetBanking' && (
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                  <p className="text-neutral-400">Select Bank:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank, i) => (
                      <button
                        key={bank}
                        className={`p-2 rounded border text-left cursor-pointer ${
                          i === 0
                            ? 'bg-neutral-900 border-rose-500 text-white'
                            : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information Review */}
              <div className="pt-3 border-t border-neutral-800 text-xs space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                  Ticket recipient
                </span>
                <p className="text-neutral-200 font-medium">
                  {user.name} ({user.email}) · {user.phone}
                </p>
                <p className="text-[11px] text-neutral-400">
                  M-Ticket and QR entry code will be dispatched to this email and saved in your account.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
              
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-neutral-800">
                Booking Summary
              </h3>

              {/* Movie info snippet */}
              <div className="flex gap-3">
                <img
                  src={activeMovie.posterUrl}
                  alt={activeMovie.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-22 object-cover rounded-lg border border-neutral-800 shrink-0"
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {activeMovie.title}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {activeMovie.certificate} · {activeShowtime.format} · {activeMovie.languages[0]}
                  </p>
                  <p className="text-xs text-neutral-300 font-medium line-clamp-1">
                    {activeCinema.name}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    {activeShowtime.auditorium}
                  </p>
                </div>
              </div>

              {/* Date & Showtime */}
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850 flex items-center justify-between text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase">Screening</span>
                  <span className="font-semibold text-white">{activeShowtime.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-400 block text-[10px] uppercase">Showtime</span>
                  <span className="font-semibold text-rose-400">{activeShowtime.time}</span>
                </div>
              </div>

              {/* Seats snippet */}
              <div className="flex items-center justify-between text-xs py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Seats ({selectedSeatIds.length})</span>
                <span className="font-bold text-white font-mono">
                  {[...selectedSeatIds].sort().join(', ')}
                </span>
              </div>

              {/* F&B Snacks snippet if any */}
              {selectedSnacks.length > 0 && (
                <div className="space-y-1 py-1 border-b border-neutral-850 text-xs">
                  <span className="text-neutral-400 text-[11px] uppercase tracking-wider block">
                    Cinema Bites ({selectedSnacks.length} items)
                  </span>
                  {selectedSnacks.map((s) => (
                    <div key={s.item.id} className="flex justify-between text-neutral-300">
                      <span>{s.item.name} × {s.quantity}</span>
                      <span className="font-mono tabular-nums">₹{s.item.price * s.quantity}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Tickets Subtotal</span>
                  <span className="font-mono text-neutral-200">₹{ticketTotal}</span>
                </div>

                {snackTotal > 0 && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Food & Beverages</span>
                    <span className="font-mono text-neutral-200">₹{snackTotal}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Convenience Fee</span>
                  <span className="font-mono text-neutral-200">₹{convenienceFee}</span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Integrated GST (5%)</span>
                  <span className="font-mono text-neutral-200">₹{taxes}</span>
                </div>

                {applySkillCredits && creditsToDeduct > 0 && (
                  <div className="flex justify-between text-amber-400 font-semibold pt-1">
                    <span>Skill Credits Applied</span>
                    <span className="font-mono">- ₹{creditsToDeduct}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-3 border-t border-neutral-800">
                  <span>Total Amount</span>
                  <span className="font-mono text-emerald-400">
                    ₹{finalAmountToPay}
                  </span>
                </div>
              </div>

              {/* Pay Action CTA */}
              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Tickets...</span>
                ) : (
                  <>
                    <span>Confirm & Pay ₹{finalAmountToPay}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-neutral-500 text-center">
                By confirming, you agree to IMovies Terms of Service and Cancellation Policy.
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
