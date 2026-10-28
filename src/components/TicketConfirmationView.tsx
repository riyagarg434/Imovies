import React from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Printer,
  Share2,
  Ticket,
  ArrowRight,
  ShieldAlert,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TicketConfirmationView: React.FC = () => {
  const {
    latestConfirmedBooking,
    setActiveView,
    cancelBooking,
    showToast
  } = useApp();

  const booking = latestConfirmedBooking;

  if (!booking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-neutral-400">No recent booking found.</p>
        <button
          onClick={() => setActiveView('home')}
          className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg text-xs"
        >
          Browse Movies
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `My IMovies Ticket: ${booking.movieTitle} at ${booking.cinemaName} (${booking.showDate} ${booking.showTime}) - Seats: ${booking.seats.join(', ')} [Booking ID: ${booking.bookingCode}]`
      );
      showToast('Booking details copied to clipboard!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mb-1 border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
            Booking Confirmed!
          </h1>
          <p className="text-xs text-neutral-400">
            Your digital M-Ticket is ready. An SMS and email receipt has been sent to {booking.userEmail}.
          </p>
        </div>

        {/* Digital M-Ticket Card */}
        <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Top Notch Brand Banner */}
          <div className="bg-gradient-to-r from-rose-900/60 via-neutral-900 to-amber-950/40 p-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-rose-500" />
              <span className="font-extrabold tracking-wider text-sm font-display text-white">
                IMOVIES M-TICKET
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-400 block uppercase">Booking Code</span>
              <span className="text-xs font-mono font-bold text-amber-300">
                {booking.bookingCode}
              </span>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 space-y-6">
            
            {/* Movie Title & Format */}
            <div className="flex gap-4">
              <img
                src={booking.moviePoster}
                alt={booking.movieTitle}
                referrerPolicy="no-referrer"
                className="w-20 h-28 object-cover rounded-lg border border-neutral-800 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {booking.movieCertificate}
                  </span>
                  <span className="text-xs text-rose-400 font-semibold">
                    {booking.movieFormat}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({booking.movieLanguage})
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-display">
                  {booking.movieTitle}
                </h3>

                <p className="text-xs text-neutral-300 font-medium">
                  {booking.cinemaName}
                </p>

                <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                  {booking.cinemaAddress}
                </p>
              </div>
            </div>

            {/* Audi, Date, Showtime Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-950 rounded-xl border border-neutral-850 text-center text-xs">
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block">Auditorium</span>
                <span className="font-bold text-white text-xs line-clamp-1">{booking.auditorium}</span>
              </div>
              <div className="border-x border-neutral-850 px-1">
                <span className="text-[10px] uppercase text-neutral-500 block">Date</span>
                <span className="font-bold text-white text-xs">{booking.showDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block">Time</span>
                <span className="font-bold text-rose-400 text-xs">{booking.showTime}</span>
              </div>
            </div>

            {/* Seats Banner */}
            <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-rose-300/70 block">Allocated Seats</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">
                  {booking.seats.join(', ')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-rose-300/70 block">Total Paid</span>
                <span className="text-base font-bold font-mono text-emerald-400">
                  ₹{booking.totalAmount}
                </span>
              </div>
            </div>

            {/* Snacks if any */}
            {booking.snacks && booking.snacks.length > 0 && (
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 block font-semibold">
                  Pre-ordered Food & Beverages
                </span>
                {booking.snacks.map((s) => (
                  <div key={s.item.id} className="flex justify-between text-neutral-300">
                    <span>{s.item.name} × {s.quantity}</span>
                    <span className="font-mono">₹{s.item.price * s.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center p-4 bg-neutral-950 rounded-xl border border-neutral-850 space-y-2">
              {/* Simulated High-Density QR code pattern */}
              <div className="p-3 bg-white rounded-xl shadow-lg">
                <QrCode className="w-28 h-28 text-neutral-950" />
              </div>
              <p className="text-[11px] text-neutral-400 text-center">
                Scan this code at cinema gate entrance for direct paperless entry
              </p>
              <span className="text-[10px] font-mono text-neutral-500">
                Gate Entry opens 20 mins prior to showtime
              </span>
            </div>

            {/* Ticket Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
              <button
                onClick={handleShare}
                className="flex-1 py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Details
              </button>
            </div>

          </div>

          {/* Ticket Footer Tear Bar */}
          <div className="bg-neutral-950 p-4 border-t border-dashed border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>Payment: <strong className="text-neutral-200">{booking.paymentMethod}</strong></span>
            {booking.status === 'CONFIRMED' && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to cancel this booking? Refund will be credited to your SkillWallet.')) {
                    cancelBooking(booking.id);
                  }
                }}
                className="text-xs text-rose-400 hover:underline cursor-pointer"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setActiveView('my-bookings')}
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <span>View All My Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveView('home')}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer"
          >
            Book Another Movie
          </button>
        </div>

      </div>
    </div>
  );
};
