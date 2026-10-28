import React, { useState } from 'react';
import {
  ArrowLeft,
  Tv,
  Check,
  Shield,
  UtensilsCrossed,
  Info,
  ChevronRight,
  Ticket
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SnackAddonModal } from './SnackAddonModal';

interface SeatConfig {
  id: string;
  row: string;
  num: number;
  tier: 'PLATINUM' | 'GOLD' | 'SILVER';
  price: number;
  isWheelchair?: boolean;
}

export const SeatSelectionView: React.FC = () => {
  const {
    activeMovie,
    activeCinema,
    activeShowtime,
    selectedSeatIds,
    toggleSeat,
    proceedToCheckout,
    cancelCurrentBookingFlow,
    showToast
  } = useApp();

  const [snackModalOpen, setSnackModalOpen] = useState(false);

  if (!activeMovie || !activeCinema || !activeShowtime) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-neutral-400">No active screening selected.</p>
        <button
          onClick={cancelCurrentBookingFlow}
          className="mt-4 px-4 py-2 bg-neutral-800 text-white rounded-lg text-xs"
        >
          Return to Cinema
        </button>
      </div>
    );
  }

  const { pricing, bookedSeatIds } = activeShowtime;

  // Build auditorium seating layout
  // Rows: A, B (Platinum)
  // Rows: C, D, E, F (Gold)
  // Rows: G, H (Silver)
  const rows = [
    { row: 'A', tier: 'PLATINUM' as const, price: pricing.platinum },
    { row: 'B', tier: 'PLATINUM' as const, price: pricing.platinum },
    { row: 'C', tier: 'GOLD' as const, price: pricing.gold },
    { row: 'D', tier: 'GOLD' as const, price: pricing.gold },
    { row: 'E', tier: 'GOLD' as const, price: pricing.gold },
    { row: 'F', tier: 'GOLD' as const, price: pricing.gold },
    { row: 'G', tier: 'SILVER' as const, price: pricing.silver },
    { row: 'H', tier: 'SILVER' as const, price: pricing.silver }
  ];

  // 14 seats per row, with center aisle between 6 and 7
  const leftAisleSeats = [1, 2, 3, 4, 5, 6];
  const rightAisleSeats = [7, 8, 9, 10, 11, 12, 13, 14];

  // Compute total seat price
  const totalSeatAmount = selectedSeatIds.reduce((sum, seatId) => {
    const rowChar = seatId.charAt(0);
    if (rowChar === 'A' || rowChar === 'B') return sum + pricing.platinum;
    if (rowChar === 'C' || rowChar === 'D' || rowChar === 'E' || rowChar === 'F') return sum + pricing.gold;
    return sum + pricing.silver;
  }, 0);

  const handleProceedClick = () => {
    if (selectedSeatIds.length === 0) {
      showToast('Please select at least one seat to continue', 'warning');
      return;
    }
    // Open snack add-on modal first!
    setSnackModalOpen(true);
  };

  const handleSnackModalProceed = () => {
    setSnackModalOpen(false);
    proceedToCheckout();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between">
      
      {/* Header Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-3 px-4 sm:px-6 lg:px-8 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={cancelCurrentBookingFlow}
              className="p-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {activeMovie.title}
                </h1>
                <span className="text-[10px] font-semibold text-rose-400 bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-900/60">
                  {activeShowtime.format}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {activeCinema.name} · {activeShowtime.auditorium} ·{' '}
                <span className="text-neutral-200 font-semibold">{activeShowtime.time}</span>
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-neutral-400">
            <span>{selectedSeatIds.length} / 8 Seats Selected</span>
          </div>
        </div>
      </div>

      {/* Auditorium Seating Canvas */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col items-center">
        
        {/* Curved Screen */}
        <div className="w-full max-w-3xl mb-12 flex flex-col items-center">
          <div className="w-full h-3 bg-gradient-to-r from-rose-500/20 via-rose-500 to-rose-500/20 rounded-t-full shadow-[0_-8px_25px_rgba(244,63,94,0.4)]" />
          <div className="w-full h-10 bg-gradient-to-b from-rose-500/10 to-transparent flex items-center justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-rose-400" />
              All eyes this way please · Curved Theatrical Screen
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 mb-8 pb-4 border-b border-neutral-800 w-full max-w-xl">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-neutral-700 bg-neutral-900" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-rose-600 flex items-center justify-center text-white text-[10px] font-bold shadow-md shadow-rose-950">
              ✓
            </div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-neutral-800/80 border border-neutral-800 text-neutral-600 flex items-center justify-center text-[10px] cursor-not-allowed">
              ✕
            </div>
            <span>Sold / Occupied</span>
          </div>
        </div>

        {/* Seat Grid with Tiers */}
        <div className="w-full max-w-3xl overflow-x-auto pb-6">
          <div className="min-w-[560px] space-y-6">
            
            {/* PLATINUM RECLINERS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 px-2 pb-1 border-b border-neutral-850">
                <span className="font-semibold text-amber-300">
                  PLATINUM RECLINER — ₹{pricing.platinum}
                </span>
                <span className="text-[11px] text-neutral-500">Premium Leather Recliners with In-Seat Service</span>
              </div>
              {rows.filter((r) => r.tier === 'PLATINUM').map((r) => (
                <div key={r.row} className="flex items-center justify-center gap-3">
                  <span className="w-5 text-xs font-bold text-neutral-500 text-center font-mono">
                    {r.row}
                  </span>
                  
                  {/* Left Block */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {leftAisleSeats.map((num) => {
                      const seatId = `${r.row}${num}`;
                      const isBooked = bookedSeatIds.includes(seatId);
                      const isSelected = selectedSeatIds.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isBooked}
                          onClick={() => toggleSeat(seatId)}
                          title={`Seat ${seatId} - Platinum ₹${r.price}`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[11px] font-mono font-medium flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950 scale-105'
                              : isBooked
                              ? 'bg-neutral-850 border border-neutral-800 text-neutral-600 cursor-not-allowed'
                              : 'bg-neutral-900 border border-amber-900/40 text-neutral-300 hover:border-amber-500 hover:text-white'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : num}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle */}
                  <div className="w-6 sm:w-8" />

                  {/* Right Block */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {rightAisleSeats.map((num) => {
                      const seatId = `${r.row}${num}`;
                      const isBooked = bookedSeatIds.includes(seatId);
                      const isSelected = selectedSeatIds.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isBooked}
                          onClick={() => toggleSeat(seatId)}
                          title={`Seat ${seatId} - Platinum ₹${r.price}`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[11px] font-mono font-medium flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950 scale-105'
                              : isBooked
                              ? 'bg-neutral-850 border border-neutral-800 text-neutral-600 cursor-not-allowed'
                              : 'bg-neutral-900 border border-amber-900/40 text-neutral-300 hover:border-amber-500 hover:text-white'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* GOLD PRIME */}
            <div className="space-y-2 pt-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 px-2 pb-1 border-b border-neutral-850">
                <span className="font-semibold text-neutral-200">
                  GOLD PRIME — ₹{pricing.gold}
                </span>
                <span className="text-[11px] text-neutral-500">Optimal Viewing Angle with Dolby Sound Zone</span>
              </div>
              {rows.filter((r) => r.tier === 'GOLD').map((r) => (
                <div key={r.row} className="flex items-center justify-center gap-3">
                  <span className="w-5 text-xs font-bold text-neutral-500 text-center font-mono">
                    {r.row}
                  </span>

                  {/* Left Block */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {leftAisleSeats.map((num) => {
                      const seatId = `${r.row}${num}`;
                      const isBooked = bookedSeatIds.includes(seatId);
                      const isSelected = selectedSeatIds.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isBooked}
                          onClick={() => toggleSeat(seatId)}
                          title={`Seat ${seatId} - Gold ₹${r.price}`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[11px] font-mono font-medium flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950 scale-105'
                              : isBooked
                              ? 'bg-neutral-850 border border-neutral-800 text-neutral-600 cursor-not-allowed'
                              : 'bg-neutral-900 border border-neutral-750 text-neutral-300 hover:border-neutral-500 hover:text-white'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : num}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle */}
                  <div className="w-6 sm:w-8" />

                  {/* Right Block */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {rightAisleSeats.map((num) => {
                      const seatId = `${r.row}${num}`;
                      const isBooked = bookedSeatIds.includes(seatId);
                      const isSelected = selectedSeatIds.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isBooked}
                          onClick={() => toggleSeat(seatId)}
                          title={`Seat ${seatId} - Gold ₹${r.price}`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[11px] font-mono font-medium flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950 scale-105'
                              : isBooked
                              ? 'bg-neutral-850 border border-neutral-800 text-neutral-600 cursor-not-allowed'
                              : 'bg-neutral-900 border border-neutral-750 text-neutral-300 hover:border-neutral-500 hover:text-white'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* SILVER CLASSIC */}
            <div className="space-y-2 pt-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 px-2 pb-1 border-b border-neutral-850">
                <span className="font-semibold text-neutral-400">
                  SILVER CLASSIC — ₹{pricing.silver}
                </span>
                <span className="text-[11px] text-neutral-500">Value Seating</span>
              </div>
              {rows.filter((r) => r.tier === 'SILVER').map((r) => (
                <div key={r.row} className="flex items-center justify-center gap-3">
                  <span className="w-5 text-xs font-bold text-neutral-500 text-center font-mono">
                    {r.row}
                  </span>

                  {/* Left Block */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {leftAisleSeats.map((num) => {
                      const seatId = `${r.row}${num}`;
                      const isBooked = bookedSeatIds.includes(seatId);
                      const isSelected = selectedSeatIds.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isBooked}
                          onClick={() => toggleSeat(seatId)}
                          title={`Seat ${seatId} - Silver ₹${r.price}`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[11px] font-mono font-medium flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950 scale-105'
                              : isBooked
                              ? 'bg-neutral-850 border border-neutral-800 text-neutral-600 cursor-not-allowed'
                              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : num}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle */}
                  <div className="w-6 sm:w-8" />

                  {/* Right Block */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {rightAisleSeats.map((num) => {
                      const seatId = `${r.row}${num}`;
                      const isBooked = bookedSeatIds.includes(seatId);
                      const isSelected = selectedSeatIds.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isBooked}
                          onClick={() => toggleSeat(seatId)}
                          title={`Seat ${seatId} - Silver ₹${r.price}`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[11px] font-mono font-medium flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950 scale-105'
                              : isBooked
                              ? 'bg-neutral-850 border border-neutral-800 text-neutral-600 cursor-not-allowed'
                              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Floating Bottom Booking Action Bar (governed under 15% mobile viewport cap) */}
      <div className="sticky bottom-0 z-40 bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <div className="text-[11px] text-neutral-400">
                {selectedSeatIds.length > 0 ? (
                  <span>
                    Selected: <strong className="text-white font-mono">{[...selectedSeatIds].sort().join(', ')}</strong> ({selectedSeatIds.length} Seats)
                  </span>
                ) : (
                  <span>No seats selected</span>
                )}
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                <span>₹{totalSeatAmount}</span>
                <span className="text-xs text-neutral-400 font-normal">
                  + Conv. Fee & Taxes
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setSnackModalOpen(true)}
              className="px-3.5 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
              <span>Food & Combos</span>
            </button>

            <button
              onClick={handleProceedClick}
              disabled={selectedSeatIds.length === 0}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedSeatIds.length > 0
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/60'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Snack Selection Modal */}
      {snackModalOpen && (
        <SnackAddonModal
          onProceed={handleSnackModalProceed}
          onClose={() => setSnackModalOpen(false)}
        />
      )}

    </div>
  );
};
