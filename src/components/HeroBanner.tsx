import React from 'react';
import { Play, Ticket, Star, Clock, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie } from '../types';

export const HeroBanner: React.FC = () => {
  const { movies, selectMovieForDetails, openTrailerModal } = useApp();

  const featuredMovie = movies.find((m) => m.id === 'mov_chrono_horizon') || movies[0];

  if (!featuredMovie) return null;

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-800">
      {/* Background Cinematic Backdrop with Measured Scrim */}
      <div className="relative h-[480px] sm:h-[540px] lg:h-[600px] w-full">
        <img
          src={featuredMovie.heroBannerUrl || featuredMovie.posterUrl}
          alt={featuredMovie.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
        />
        
        {/* Measured Scrim - Deep cinematic dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent max-w-4xl" />

        {/* Content Container */}
        <div className="absolute inset-0 flex items-end pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-4">
              
              {/* Clean metadata without pill boxes */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-300">
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {featuredMovie.rating}/10
                </span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="tabular-nums">{(featuredMovie.voteCount / 1000).toFixed(1)}k+ votes</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-neutral-200">{featuredMovie.certificate}</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  {Math.floor(featuredMovie.durationMinutes / 60)}h {featuredMovie.durationMinutes % 60}m
                </span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-rose-400 font-semibold">{featuredMovie.formats.join(', ')}</span>
              </div>

              {/* Title with text-wrap: balance */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display leading-tight" style={{ textWrap: 'balance' }}>
                {featuredMovie.title}
              </h1>

              {/* Synopsis */}
              <p className="text-sm sm:text-base text-neutral-300 line-clamp-2 max-w-xl leading-relaxed">
                {featuredMovie.synopsis}
              </p>

              {/* Languages & Genres */}
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <span>{featuredMovie.genres.join(' / ')}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredMovie.languages.join(', ')}</span>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => selectMovieForDetails(featuredMovie)}
                  className="px-6 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-950/60 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  Book Tickets
                </button>
                <button
                  onClick={() => openTrailerModal(featuredMovie)}
                  className="px-5 py-2.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 border border-neutral-700 font-medium text-sm backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-amber-400" />
                  Watch Trailer
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
