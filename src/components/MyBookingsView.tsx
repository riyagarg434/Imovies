import React, { useState } from 'react';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
  ArrowRight,
  ShieldAlert,
  Wallet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

export const MyBookingsView: React.FC = () => {
  const { bookings, cancelBooking, setActiveView, showToast } = useApp();
  const [filter, setFilter] = useState<'UPCOMING' | 'PAST'>('UPCOMING');
  const [selectedTicketForModal, setSelectedTicketForModal] = useState<Booking | null>(null);

  const upcomingBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const pastBookings = bookings.filter((b) => b.status === 'CANCELLED');

  const displayedBookings = filter === 'UPCOMING' ? upcomingBookings : pastBookings;

  const handleCancelClick = (booking: Booking) => {
    const refundAmount = booking.creditsUsed > 0 ? booking.creditsUsed : Math.floor(booking.totalAmount * 0.9);
    const confirmed = window.confirm(
      `Are you sure you want to cancel booking ${booking.bookingCode} for "${booking.movieTitle}"?\n\nA refund of ₹${refundAmount} will be immediately credited back to your SkillWallet.`
    );
    if (confirmed) {
      cancelBooking(booking.id);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-850 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2">
              <Ticket className="w-6 h-6 text-rose-500" />
              My Cinema Bookings & Tickets
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Access your digital entry passes, manage show reservations, and track refunds
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
            <button
              onClick={() => setFilter('UPCOMING')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                filter === 'UPCOMING'
                  ? 'bg-rose-600 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Upcoming ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setFilter('PAST')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                filter === 'PAST'
                  ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Cancelled / History ({pastBookings.length})
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {displayedBookings.length === 0 ? (
          <div className="py-16 text-center bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-3">
            <Ticket className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-base font-semibold text-neutral-300">
              {filter === 'UPCOMING' ? 'No upcoming bookings found' : 'No cancelled or past bookings'}
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Ready for a blockbuster experience on the big screen?
            </p>
            <button
              onClick={() => setActiveView('home')}
              className="mt-2 px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer"
            >
              Explore Movies Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedBookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-750 transition-all flex flex-col md:flex-row gap-5 items-start justify-between"
              >
                {/* Movie & Show Info */}
                <div className="flex gap-4">
                  <img
                    src={b.moviePoster}
                    alt={b.movieTitle}
                    referrerPolicy="no-referrer"
                    className="w-20 h-28 object-cover rounded-lg border border-neutral-800 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-amber-300">
                        {b.bookingCode}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">·</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 border border-neutral-700 font-mono">
                        {b.movieFormat}
                      </span>
                      {b.status === 'CONFIRMED' ? (
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60">
                          Active Pass
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                          Cancelled
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {b.movieTitle}
                    </h3>

                    <p className="text-xs text-neutral-300">
                      {b.cinemaName} · <span className="text-neutral-400">{b.auditorium}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-1">
                      <span className="flex items-center gap-1 text-white font-medium">
                        <Calendar className="w-3.5 h-3.5 text-rose-500" />
                        {b.showDate}
                      </span>
                      <span className="flex items-center gap-1 text-rose-400 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {b.showTime}
                      </span>
                      <span>
                        Seats: <strong className="text-white font-mono">{b.seats.join(', ')}</strong>
                      </span>
                    </div>

                    {b.snacks && b.snacks.length > 0 && (
                      <p className="text-[11px] text-amber-400 pt-0.5">
                        Includes: {b.snacks.map((s) => `${s.item.name} (${s.quantity})`).join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-800">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase text-neutral-500 block">Total Paid</span>
                    <span className="text-base font-bold font-mono text-emerald-400">
                      ₹{b.totalAmount}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      via {b.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTicketForModal(b)}
                      className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
                    >
                      <QrCode className="w-3.5 h-3.5 text-rose-400" />
                      View Pass
                    </button>

                    {b.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleCancelClick(b)}
                        className="px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 text-xs font-medium border border-neutral-800 hover:border-rose-900 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Ticket QR Modal */}
      {selectedTicketForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-xs font-mono font-bold text-amber-300">
                {selectedTicketForModal.bookingCode}
              </span>
              <button
                onClick={() => setSelectedTicketForModal(null)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                Close ✕
              </button>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white font-display">
                {selectedTicketForModal.movieTitle}
              </h3>
              <p className="text-xs text-neutral-400">
                {selectedTicketForModal.cinemaName} · {selectedTicketForModal.auditorium}
              </p>
              <p className="text-xs text-rose-400 font-semibold">
                {selectedTicketForModal.showDate} at {selectedTicketForModal.showTime}
              </p>
              <p className="text-sm font-mono font-bold text-white">
                Seats: {selectedTicketForModal.seats.join(', ')}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
              <div className="p-3 bg-white rounded-lg">
                <QrCode className="w-32 h-32 text-neutral-950" />
              </div>
              <span className="text-[11px] text-neutral-400">
                Scan at entrance gate for validation
              </span>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white w-full"
              >
                Print Ticket
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
