import React, { useEffect } from 'react';
import { X, Play, Film, Star, Clock, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrailerModal: React.FC = () => {
  const { activeTrailerMovie, closeTrailerModal } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTrailerModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeTrailerModal]);

  if (!activeTrailerMovie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-white font-display line-clamp-1">
              Official Theatrical Trailer — {activeTrailerMovie.title}
            </h3>
          </div>
          <button
            onClick={closeTrailerModal}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
          {/* Simulated Theatrical Trailer Presentation */}
          <img
            src={activeTrailerMovie.heroBannerUrl || activeTrailerMovie.posterUrl}
            alt={activeTrailerMovie.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85 scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/20" />

          {/* Central Play/Theatrical overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl shadow-rose-950 hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
            <div>
              <p className="text-lg font-bold text-white font-display">
                {activeTrailerMovie.title}
              </p>
              <p className="text-xs text-neutral-300 italic">
                "{activeTrailerMovie.tagline}"
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {activeTrailerMovie.rating}/10
              </span>
              <span>·</span>
              <span>{activeTrailerMovie.formats.join(' / ')}</span>
              <span>·</span>
              <span>In Theatres Worldwide</span>
            </div>
          </div>

          {/* Sound watermark */}
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-neutral-950/80 backdrop-blur-sm text-[10px] font-mono text-neutral-400 flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-rose-400" />
            <span>Dolby Atmos 7.1 Master Audio</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs">
          <span className="text-neutral-400">
            Directed by <strong className="text-neutral-200">{activeTrailerMovie.director}</strong>
          </span>
          <button
            onClick={closeTrailerModal}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
