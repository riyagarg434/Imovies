import React from 'react';
import {
  Building2,
  MapPin,
  Clock,
  Sparkles,
  Film,
  Navigation,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Cinema, Movie, Showtime } from '../types';

export const CinemasListView: React.FC = () => {
  const {
    cinemas,
    city,
    movies,
    showtimes,
    selectedDate,
    selectShowtimeForBooking,
    selectMovieForDetails
  } = useApp();

  const cityCinemas = cinemas.filter((c) => c.city === city);
  const activeCinemas = cityCinemas.length > 0 ? cityCinemas : cinemas;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-850 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2">
              <Building2 className="w-6 h-6 text-rose-500" />
              Theatres & Multiplexes in {city}
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Experience the magic of laser projection, Dolby Atmos sound, and luxury recliner lounges
            </p>
          </div>
          <span className="text-xs text-neutral-400 font-medium tabular-nums">
            {activeCinemas.length} Cinemas Available
          </span>
        </div>

        {/* Cinema List */}
        <div className="space-y-6">
          {activeCinemas.map((cinema) => {
            // Find today's shows for this cinema
            const cinemaShows = showtimes.filter(
              (st) => st.cinemaId === cinema.id && st.date === selectedDate
            );

            // Group by movie
            const moviesInThisCinema: { movie: Movie; shows: Showtime[] }[] = [];
            cinemaShows.forEach((show) => {
              const movie = movies.find((m) => m.id === show.movieId);
              if (movie) {
                const existing = moviesInThisCinema.find((m) => m.movie.id === movie.id);
                if (existing) {
                  existing.shows.push(show);
                } else {
                  moviesInThisCinema.push({ movie, shows: [show] });
                }
              }
            });

            return (
              <div
                key={cinema.id}
                className="p-5 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 hover:border-neutral-750 transition-colors"
              >
                {/* Cinema Top Info */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-950/40 text-rose-400 border border-rose-900/60">
                        {cinema.chain}
                      </span>
                      <h2 className="text-lg font-bold text-white">
                        {cinema.name}
                      </h2>
                    </div>

                    <p className="text-xs text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      {cinema.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {cinema.features.map((f, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-neutral-300 bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Showtimes for this cinema */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Screenings on {selectedDate}
                  </h3>

                  {moviesInThisCinema.length === 0 ? (
                    <div className="py-4 text-xs text-neutral-500">
                      No schedule listed for this date. Check tomorrow or explore upcoming releases.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {moviesInThisCinema.map(({ movie, shows }) => (
                        <div
                          key={movie.id}
                          className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div
                            onClick={() => selectMovieForDetails(movie)}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <img
                              src={movie.posterUrl}
                              alt={movie.title}
                              referrerPolicy="no-referrer"
                              className="w-12 h-16 object-cover rounded border border-neutral-800 shrink-0"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                                {movie.title}
                              </h4>
                              <p className="text-[11px] text-neutral-400">
                                {movie.certificate} · {movie.languages[0]} · {Math.floor(movie.durationMinutes / 60)}h {movie.durationMinutes % 60}m
                              </p>
                            </div>
                          </div>

                          {/* Show buttons */}
                          <div className="flex flex-wrap items-center gap-2">
                            {shows.map((show) => (
                              <button
                                key={show.id}
                                onClick={() => selectShowtimeForBooking(movie, cinema, show)}
                                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-750 text-left transition-colors cursor-pointer group/btn"
                              >
                                <span className="text-xs font-bold text-white font-mono block">
                                  {show.time}
                                </span>
                                <span className="text-[10px] text-emerald-400 font-mono">
                                  {show.format} · ₹{show.pricing.silver}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
