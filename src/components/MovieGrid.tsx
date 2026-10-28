import React from 'react';
import { Star, Clock, Ticket, Play, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie } from '../types';

export const MovieGrid: React.FC = () => {
  const {
    movies,
    searchQuery,
    selectedGenre,
    selectedLanguage,
    selectedFormat,
    selectMovieForDetails,
    openTrailerModal
  } = useApp();

  // Filter logic
  const filteredMovies = movies.filter((movie) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = movie.title.toLowerCase().includes(q);
      const matchGenre = movie.genres.some((g) => g.toLowerCase().includes(q));
      const matchLanguage = movie.languages.some((l) => l.toLowerCase().includes(q));
      const matchDirector = movie.director.toLowerCase().includes(q);
      if (!matchTitle && !matchGenre && !matchLanguage && !matchDirector) {
        return false;
      }
    }

    // Genre
    if (selectedGenre !== 'All' && !movie.genres.includes(selectedGenre)) {
      return false;
    }

    // Language
    if (selectedLanguage !== 'All' && !movie.languages.includes(selectedLanguage)) {
      return false;
    }

    // Format
    if (selectedFormat !== 'All' && !movie.formats.includes(selectedFormat)) {
      return false;
    }

    return true;
  });

  const nowShowing = filteredMovies.filter((m) => m.isNowShowing);
  const comingSoon = filteredMovies.filter((m) => !m.isNowShowing);

  const renderMovieCard = (movie: Movie) => {
    return (
      <div
        key={movie.id}
        className="group relative flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-950/50"
      >
        {/* Poster Media Box (3:4 aspect ratio) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Scrim Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Rating tag in corner (quiet, unboxed or minimal glass) */}
          {movie.rating > 0 && (
            <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-semibold text-amber-400 flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{movie.rating}/10</span>
              <span className="text-[10px] text-neutral-400 font-normal tabular-nums">
                ({(movie.voteCount / 1000).toFixed(1)}k)
              </span>
            </div>
          )}

          {/* Quick trailer play button on poster hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openTrailerModal(movie);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-neutral-950/70 hover:bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-700 flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            title="Watch Trailer"
          >
            <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-amber-400" />
          </button>

          {/* Format Badges at bottom of poster */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px]">
            <span className="font-medium text-neutral-200 bg-neutral-950/80 px-2 py-0.5 rounded backdrop-blur-sm border border-neutral-800">
              {movie.formats.join(' · ')}
            </span>
            <span className="text-neutral-300 bg-neutral-950/80 px-1.5 py-0.5 rounded backdrop-blur-sm border border-neutral-800 font-mono text-[10px]">
              {movie.certificate}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Title */}
            <h3
              onClick={() => selectMovieForDetails(movie)}
              className="text-base font-bold text-neutral-100 group-hover:text-rose-400 transition-colors line-clamp-1 cursor-pointer"
            >
              {movie.title}
            </h3>

            {/* Clean Metadata without pills */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
              <span>{movie.genres[0]}</span>
              {movie.genres[1] && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{movie.genres[1]}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {Math.floor(movie.durationMinutes / 60)}h {movie.durationMinutes % 60}m
              </span>
            </div>

            {/* Languages available */}
            <p className="text-[11px] text-neutral-500 mt-1 line-clamp-1">
              {movie.languages.join(', ')}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2 border-t border-neutral-800/60">
            {movie.isNowShowing ? (
              <button
                onClick={() => selectMovieForDetails(movie)}
                className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm shadow-rose-950/50"
              >
                <Ticket className="w-3.5 h-3.5" />
                Book Tickets
              </button>
            ) : (
              <button
                onClick={() => selectMovieForDetails(movie)}
                className="w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Coming {movie.releaseDate}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Section: Now Showing */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
              Now Showing in Cinemas
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Explore showtimes, reserve seats, and earn Skill Credits
            </p>
          </div>
          <span className="text-xs font-medium text-neutral-400 tabular-nums">
            {nowShowing.length} Movie{nowShowing.length !== 1 ? 's' : ''} Found
          </span>
        </div>

        {nowShowing.length === 0 ? (
          <div className="py-12 text-center bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <p className="text-neutral-400 text-sm">
              No movies match your current search filters.
            </p>
            <p className="text-neutral-500 text-xs mt-1">
              Try adjusting the genre, format, or search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {nowShowing.map(renderMovieCard)}
          </div>
        )}
      </div>

      {/* Section: Coming Soon */}
      {comingSoon.length > 0 && (
        <div className="pt-6 border-t border-neutral-850">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-200 font-display">
                Coming Soon to Theatres
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Advance booking opening shortly
              </p>
            </div>
            <span className="text-xs font-medium text-neutral-400 tabular-nums">
              {comingSoon.length} Titles
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {comingSoon.map(renderMovieCard)}
          </div>
        </div>
      )}
    </div>
  );
};
