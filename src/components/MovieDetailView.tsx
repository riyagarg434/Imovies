import React from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Play,
  Calendar,
  Info,
  MapPin,
  CheckCircle2,
  Film,
  Sparkles,
  ShieldCheck,
  ThumbsUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Cinema, Showtime } from '../types';

export const MovieDetailView: React.FC = () => {
  const {
    activeMovie,
    setActiveView,
    cinemas,
    showtimes,
    city,
    selectedDate,
    setSelectedDate,
    selectShowtimeForBooking,
    openTrailerModal
  } = useApp();

  if (!activeMovie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-neutral-400">No movie selected.</p>
        <button
          onClick={() => setActiveView('home')}
          className="mt-4 px-4 py-2 bg-neutral-800 text-white rounded-lg text-xs"
        >
          Return to Movies
        </button>
      </div>
    );
  }

  // Filter showtimes for this movie & date
  const movieShowtimes = showtimes.filter(
    (st) => st.movieId === activeMovie.id && st.date === selectedDate
  );

  // Group by cinema
  const cinemasWithShows: { cinema: Cinema; shows: Showtime[] }[] = [];
  
  // Cinemas in current city first
  const cityCinemas = cinemas.filter((c) => c.city === city);
  
  cityCinemas.forEach((cinema) => {
    const shows = movieShowtimes.filter((st) => st.cinemaId === cinema.id);
    if (shows.length > 0) {
      cinemasWithShows.push({ cinema, shows });
    }
  });

  // If no shows in selected city, check all cinemas
  if (cinemasWithShows.length === 0) {
    cinemas.forEach((cinema) => {
      const shows = movieShowtimes.filter((st) => st.cinemaId === cinema.id);
      if (shows.length > 0) {
        cinemasWithShows.push({ cinema, shows });
      }
    });
  }

  const DATES = [
    { full: '2026-10-28', label: 'Today, 28 Oct' },
    { full: '2026-10-29', label: 'Tomorrow, 29 Oct' },
    { full: '2026-10-30', label: 'Fri, 30 Oct' },
    { full: '2026-10-31', label: 'Sat, 31 Oct' },
    { full: '2026-11-01', label: 'Sun, 01 Nov' }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-20">
      
      {/* Back Navigation Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Movies
          </button>
          <div className="text-xs text-neutral-400">
            Booking for <span className="text-white font-medium">{city}</span>
          </div>
        </div>
      </div>

      {/* Cinematic Backdrop Hero */}
      <div className="relative w-full bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Poster (3:4 ratio) */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950 group">
                <img
                  src={activeMovie.posterUrl}
                  alt={activeMovie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => openTrailerModal(activeMovie)}
                  className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white font-medium text-xs cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                  Watch Trailer
                </button>
              </div>
            </div>

            {/* Right: Movie Info & Synopsis */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4">
              
              {/* Clean metadata line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                <span className="text-amber-400 font-bold flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {activeMovie.rating}/10
                </span>
                <span className="tabular-nums">({(activeMovie.voteCount / 1000).toFixed(1)}k+ votes)</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="font-mono text-neutral-300 font-semibold">{activeMovie.certificate}</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  {Math.floor(activeMovie.durationMinutes / 60)}h {activeMovie.durationMinutes % 60}m
                </span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-rose-400 font-semibold">{activeMovie.formats.join(', ')}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
                {activeMovie.title}
              </h1>

              {/* Tagline */}
              <p className="text-sm font-medium text-neutral-400 italic">
                "{activeMovie.tagline}"
              </p>

              {/* Languages & Genres */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div>
                  <span className="text-neutral-500">Audio: </span>
                  <span className="text-neutral-200 font-medium">{activeMovie.languages.join(', ')}</span>
                </div>
                <span aria-hidden="true" className="text-neutral-700">|</span>
                <div>
                  <span className="text-neutral-500">Genres: </span>
                  <span className="text-neutral-200 font-medium">{activeMovie.genres.join(', ')}</span>
                </div>
                <span aria-hidden="true" className="text-neutral-700">|</span>
                <div>
                  <span className="text-neutral-500">Directed by: </span>
                  <span className="text-neutral-200 font-medium">{activeMovie.director}</span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  About the Movie
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
                  {activeMovie.synopsis}
                </p>
              </div>

              {/* Cast Row */}
              {activeMovie.cast && activeMovie.cast.length > 0 && (
                <div className="pt-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Cast & Crew
                  </h3>
                  <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
                    {activeMovie.cast.map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-neutral-950/60 border border-neutral-800 rounded-lg p-2 min-w-[160px] shrink-0">
                        <img
                          src={c.avatarUrl}
                          alt={c.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                        />
                        <div className="text-xs">
                          <p className="font-semibold text-neutral-200 line-clamp-1">{c.name}</p>
                          <p className="text-[11px] text-neutral-400 line-clamp-1">{c.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Policy badge */}
              {activeMovie.cancellationAllowed && (
                <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Cancellation Available · Instant refund up to 2 hours before show</span>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* Showtimes & Cinemas Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Section Header & Date Selector */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-500" />
                Select Cinema & Showtime
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Showing scheduled screenings across {city} multiplexes
              </p>
            </div>

            {/* Date Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {DATES.map((d) => (
                <button
                  key={d.full}
                  onClick={() => setSelectedDate(d.full)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedDate === d.full
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Seat Status Legend */}
          <div className="flex items-center gap-5 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              Fast Filling
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              Almost Full
            </span>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:inline text-neutral-400">
              Prices: Silver ₹220 · Gold ₹350 · Platinum Recliner ₹550
            </span>
          </div>

          {/* Multiplex List */}
          <div className="space-y-4 pt-2">
            {cinemasWithShows.length === 0 ? (
              <div className="py-10 text-center bg-neutral-950 rounded-lg border border-neutral-850">
                <p className="text-sm text-neutral-400">
                  No shows currently listed for this date in {city}.
                </p>
                <button
                  onClick={() => setSelectedDate('2026-10-28')}
                  className="mt-3 text-xs text-rose-400 hover:underline font-medium"
                >
                  Check Today's Shows (28 Oct)
                </button>
              </div>
            ) : (
              cinemasWithShows.map(({ cinema, shows }) => (
                <div
                  key={cinema.id}
                  className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-750 transition-colors space-y-3"
                >
                  {/* Cinema Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">
                          {cinema.name}
                        </h3>
                        <span className="text-[11px] text-neutral-400 font-normal">
                          ({cinema.distanceKm} km away)
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        {cinema.address}
                      </p>
                    </div>

                    {/* Features unboxed */}
                    <div className="flex flex-wrap items-center gap-1 text-[11px] text-neutral-400">
                      {cinema.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-neutral-400">
                          {f}{i < Math.min(cinema.features.length, 3) - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Showtimes Strip */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-neutral-850">
                    {shows.map((show) => {
                      const statusColor =
                        show.status === 'Almost Full'
                          ? 'border-rose-900/60 hover:border-rose-500 text-rose-300'
                          : show.status === 'Fast Filling'
                          ? 'border-amber-900/60 hover:border-amber-500 text-amber-300'
                          : 'border-neutral-800 hover:border-neutral-600 text-neutral-200';

                      return (
                        <button
                          key={show.id}
                          onClick={() => selectShowtimeForBooking(activeMovie, cinema, show)}
                          className={`group/btn relative px-3.5 py-2 rounded-lg bg-neutral-900 border ${statusColor} hover:bg-neutral-850 transition-all text-left cursor-pointer`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-white tabular-nums">
                              {show.time}
                            </span>
                            <span className="text-[10px] font-semibold text-neutral-400">
                              {show.format}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between gap-2 mt-0.5 text-[10px] text-neutral-400">
                            <span>{show.sound.split(' ')[0]}</span>
                            <span className="font-mono text-emerald-400">
                              ₹{show.pricing.silver}
                            </span>
                          </div>

                          <div className="text-[9px] text-neutral-500 font-medium">
                            {show.status}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Reviews Section */}
        {activeMovie.reviews && activeMovie.reviews.length > 0 && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-display">
              Audience Reviews ({activeMovie.reviews.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeMovie.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-200">{rev.userName}</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {rev.rating}/10
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{rev.comment}</p>
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <span>{rev.date}</span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <ThumbsUp className="w-3 h-3" />
                      {rev.likes} helpful
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
