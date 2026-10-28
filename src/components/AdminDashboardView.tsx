import React, { useState } from 'react';
import {
  ShieldCheck,
  Film,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Users,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieGenre, MovieLanguage, MovieFormat } from '../types';

export const AdminDashboardView: React.FC = () => {
  const {
    movies,
    cinemas,
    showtimes,
    bookings,
    addMovie,
    addShowtime,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MOVIES' | 'SHOWS' | 'AUDIT'>('OVERVIEW');
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [showAddShowModal, setShowAddShowModal] = useState(false);

  // New Movie Form State
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newDirector, setNewDirector] = useState('');
  const [newDuration, setNewDuration] = useState(135);
  const [newCertificate, setNewCertificate] = useState<'U' | 'UA 13+' | 'UA 16+' | 'A 18+'>('UA 16+');
  const [newPosterUrl, setNewPosterUrl] = useState('');
  const [newGenres, setNewGenres] = useState<MovieGenre[]>(['Sci-Fi', 'Action']);
  const [newFormats, setNewFormats] = useState<MovieFormat[]>(['IMAX 3D', '2D']);

  // New Showtime Form State
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0]?.id || '');
  const [selectedCinemaId, setSelectedCinemaId] = useState(cinemas[0]?.id || '');
  const [newAudi, setNewAudi] = useState('Audi 1 - Laser 4K');
  const [newTime, setNewTime] = useState('08:00 PM');
  const [newDate, setNewDate] = useState('2026-10-28');
  const [newSilverPrice, setNewSilverPrice] = useState(200);
  const [newGoldPrice, setNewGoldPrice] = useState(320);
  const [newPlatinumPrice, setNewPlatinumPrice] = useState(500);

  // KPI Calculations
  const confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const totalGrossRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalTicketsSold = confirmedBookings.reduce((sum, b) => sum + b.seats.length, 0);
  
  // Calculate approximate occupancy
  const totalAuditoriumSeats = showtimes.length * 112; // 8 rows * 14 seats
  const totalBookedSeats = showtimes.reduce((sum, st) => sum + st.bookedSeatIds.length, 0);
  const overallOccupancyPercent = totalAuditoriumSeats > 0
    ? Math.round((totalBookedSeats / totalAuditoriumSeats) * 100)
    : 34;

  const handleCreateMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please specify a movie title', 'warning');
      return;
    }

    addMovie({
      title: newTitle,
      tagline: newTagline || 'A thrilling cinematic experience.',
      synopsis: newSynopsis || 'Experience this masterclass on the biggest cinema screens.',
      director: newDirector || 'Cinema Director',
      durationMinutes: Number(newDuration),
      certificate: newCertificate,
      posterUrl: newPosterUrl || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=800&fit=crop',
      genres: newGenres,
      languages: ['English', 'Hindi'],
      formats: newFormats,
      releaseDate: '2026-10-28',
      isNowShowing: true,
      cancellationAllowed: true,
      cast: []
    });

    setShowAddMovieModal(false);
    setNewTitle('');
    setNewSynopsis('');
  };

  const handleCreateShowtime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovieId || !selectedCinemaId) return;

    addShowtime({
      movieId: selectedMovieId,
      cinemaId: selectedCinemaId,
      auditorium: newAudi,
      time: newTime,
      date: newDate,
      format: '2D',
      sound: 'Dolby Atmos 7.1',
      status: 'Available',
      pricing: {
        silver: Number(newSilverPrice),
        gold: Number(newGoldPrice),
        platinum: Number(newPlatinumPrice)
      }
    });

    setShowAddShowModal(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-850 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white font-display">
                Cinema Partner & Multiplex Admin
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">
                Manage movie inventory, schedule auditoriums, and monitor box office analytics
              </p>
            </div>
          </div>

          {/* Action Modals triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddMovieModal(true)}
              className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-rose-950/40"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Movie
            </button>
            <button
              onClick={() => setShowAddShowModal(true)}
              className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Schedule Show
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-neutral-850 pb-2">
          {(['OVERVIEW', 'MOVIES', 'SHOWS', 'AUDIT'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-neutral-100 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab === 'OVERVIEW' && 'Metrics & KPIs'}
              {tab === 'MOVIES' && `Movies (${movies.length})`}
              {tab === 'SHOWS' && `Showtimes (${showtimes.length})`}
              {tab === 'AUDIT' && `Bookings Ledger (${bookings.length})`}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                  Gross Box Office
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  ₹{totalGrossRevenue.toLocaleString()}
                </div>
                <p className="text-[10px] text-neutral-400">Includes ticket sales & F&B</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                  Tickets Reserved
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  {totalTicketsSold} <span className="text-xs text-neutral-500 font-normal">Seats</span>
                </div>
                <p className="text-[10px] text-neutral-400">Across verified bookings</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                  Auditorium Occupancy
                </span>
                <div className="text-2xl font-bold font-mono text-amber-400">
                  {overallOccupancyPercent}%
                </div>
                <p className="text-[10px] text-neutral-400">Real-time seat filling rate</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                  Active Multiplexes
                </span>
                <div className="text-2xl font-bold font-mono text-cyan-400">
                  {cinemas.length} <span className="text-xs text-neutral-500 font-normal">Hubs</span>
                </div>
                <p className="text-[10px] text-neutral-400">Connected in real-time</p>
              </div>
            </div>

            {/* Multiplex Live Capacity Grid */}
            <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Multiplex Auditorium Capacity & Live Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cinemas.slice(0, 4).map((cinema) => {
                  const cinemaShows = showtimes.filter((s) => s.cinemaId === cinema.id);
                  const totalOccupied = cinemaShows.reduce((sum, s) => sum + s.bookedSeatIds.length, 0);

                  return (
                    <div key={cinema.id} className="p-4 rounded-lg bg-neutral-950 border border-neutral-850 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{cinema.name}</h4>
                        <span className="text-[11px] font-mono text-emerald-400">
                          {totalOccupied} Seats Booked
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400">{cinema.address}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 pt-1">
                        <span>{cinemaShows.length} Scheduled Shows</span>
                        <span>·</span>
                        <span>{cinema.features[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MOVIES LIST */}
        {activeTab === 'MOVIES' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movies.map((m) => (
                <div key={m.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex gap-4">
                  <img
                    src={m.posterUrl}
                    alt={m.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-24 object-cover rounded-lg border border-neutral-800 shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{m.title}</h4>
                      <span className="text-[10px] font-mono text-amber-400">★ {m.rating}</span>
                    </div>
                    <p className="text-xs text-neutral-400">{m.genres.join(', ')}</p>
                    <p className="text-[11px] text-neutral-500">
                      {m.certificate} · {Math.floor(m.durationMinutes / 60)}h {m.durationMinutes % 60}m · {m.languages.join(', ')}
                    </p>
                    <p className="text-[11px] text-rose-400 font-semibold pt-1">
                      Formats: {m.formats.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SHOWTIMES LIST */}
        {activeTab === 'SHOWS' && (
          <div className="space-y-3">
            {showtimes.map((st) => {
              const movie = movies.find((m) => m.id === st.movieId);
              const cinema = cinemas.find((c) => c.id === st.cinemaId);

              return (
                <div
                  key={st.id}
                  className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-white text-sm block">
                      {movie?.title || st.movieId}
                    </span>
                    <span className="text-neutral-400">
                      {cinema?.name || st.cinemaId} · {st.auditorium}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="font-bold font-mono text-rose-400 text-sm block">
                        {st.time} ({st.date})
                      </span>
                      <span className="text-neutral-400 text-[11px]">
                        {st.bookedSeatIds.length} Occupied · {st.status}
                      </span>
                    </div>

                    <div className="font-mono text-neutral-300">
                      ₹{st.pricing.silver} / ₹{st.pricing.gold} / ₹{st.pricing.platinum}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: AUDIT LOG */}
        {activeTab === 'AUDIT' && (
          <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
            <div className="p-4 border-b border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Live Transaction & Booking Audit Ledger
              </h3>
            </div>
            <div className="divide-y divide-neutral-850 text-xs">
              {bookings.map((b) => (
                <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-850/50 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-amber-300">{b.bookingCode}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        b.status === 'CONFIRMED' ? 'bg-emerald-950 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-neutral-200 font-medium">
                      {b.movieTitle} — {b.seats.join(', ')} ({b.cinemaName})
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Customer: {b.userName} ({b.userEmail}) · {b.bookedAt}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-mono font-bold text-white text-sm block">
                      ₹{b.totalAmount}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      via {b.paymentMethod}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add Movie Modal */}
      {showAddMovieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white font-display">
                Add Movie to Catalogue
              </h3>
              <button
                onClick={() => setShowAddMovieModal(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMovie} className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Movie Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Interstellar Odyssey"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="e.g. Beyond the edge of tomorrow"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Certificate</label>
                  <select
                    value={newCertificate}
                    onChange={(e) => setNewCertificate(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                  >
                    <option value="U">U</option>
                    <option value="UA 13+">UA 13+</option>
                    <option value="UA 16+">UA 16+</option>
                    <option value="A 18+">A 18+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Director</label>
                <input
                  type="text"
                  value={newDirector}
                  onChange={(e) => setNewDirector(e.target.value)}
                  placeholder="e.g. Christopher Nolan"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Synopsis</label>
                <textarea
                  rows={3}
                  value={newSynopsis}
                  onChange={(e) => setNewSynopsis(e.target.value)}
                  placeholder="Plot summary..."
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMovieModal(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold cursor-pointer"
                >
                  Publish Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Showtime Modal */}
      {showAddShowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white font-display">
                Schedule New Showtime
              </h3>
              <button
                onClick={() => setShowAddShowModal(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateShowtime} className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Select Movie</label>
                <select
                  value={selectedMovieId}
                  onChange={(e) => setSelectedMovieId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                >
                  {movies.map((m) => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Select Multiplex</label>
                <select
                  value={selectedCinemaId}
                  onChange={(e) => setSelectedCinemaId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                >
                  {cinemas.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Auditorium</label>
                  <input
                    type="text"
                    value={newAudi}
                    onChange={(e) => setNewAudi(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Showtime</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 09:30 PM"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-neutral-400 block mb-1">Silver (₹)</label>
                  <input
                    type="number"
                    value={newSilverPrice}
                    onChange={(e) => setNewSilverPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Gold (₹)</label>
                  <input
                    type="number"
                    value={newGoldPrice}
                    onChange={(e) => setNewGoldPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Platinum (₹)</label>
                  <input
                    type="number"
                    value={newPlatinumPrice}
                    onChange={(e) => setNewPlatinumPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold cursor-pointer"
                >
                  Publish Showtime
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
