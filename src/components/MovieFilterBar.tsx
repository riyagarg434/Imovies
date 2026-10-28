import React from 'react';
import { Calendar, Filter, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieGenre, MovieLanguage, MovieFormat } from '../types';

const GENRES: (MovieGenre | 'All')[] = ['All', 'Sci-Fi', 'Action', 'Animation', 'Thriller', 'Adventure'];
const FORMATS: (MovieFormat | 'All')[] = ['All', 'IMAX 3D', '3D', '2D', '4DX'];
const LANGUAGES: (MovieLanguage | 'All')[] = ['All', 'English', 'Hindi', 'Tamil', 'Telugu'];

const DATES = [
  { full: '2026-10-28', day: 'TODAY', date: '28 Oct', weekday: 'Wed' },
  { full: '2026-10-29', day: 'TOM', date: '29 Oct', weekday: 'Thu' },
  { full: '2026-10-30', day: 'FRI', date: '30 Oct', weekday: 'Fri' },
  { full: '2026-10-31', day: 'SAT', date: '31 Oct', weekday: 'Sat' },
  { full: '2026-11-01', day: 'SUN', date: '01 Nov', weekday: 'Sun' },
  { full: '2026-11-02', day: 'MON', date: '02 Nov', weekday: 'Mon' }
];

export const MovieFilterBar: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    selectedGenre,
    setSelectedGenre,
    selectedFormat,
    setSelectedFormat,
    selectedLanguage,
    setSelectedLanguage
  } = useApp();

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Date Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 mr-2 shrink-0">
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>Select Date:</span>
          </div>

          {DATES.map((d) => {
            const isSelected = selectedDate === d.full;
            return (
              <button
                key={d.full}
                onClick={() => setSelectedDate(d.full)}
                className={`flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] py-1.5 px-2 rounded-lg border text-xs transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-600 border-rose-500 text-white shadow-md shadow-rose-950/40 font-semibold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider opacity-80">{d.day}</span>
                <span className="font-bold text-sm tabular-nums">{d.date}</span>
                <span className="text-[10px] opacity-75">{d.weekday}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls: Genre, Format, Language */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-neutral-850">
          
          {/* Genre Segmented Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-medium text-neutral-400 mr-1 shrink-0">Genre:</span>
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                  selectedGenre === g
                    ? 'bg-neutral-100 text-neutral-950 shadow-sm font-semibold'
                    : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Format & Language Dropdown/Toggles */}
          <div className="flex items-center gap-3">
            {/* Format filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-400 font-medium">Format:</span>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as any)}
                aria-label="Filter movies by format"
                className="bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-md px-2.5 py-1 text-xs focus:outline-none focus:border-rose-500"
              >
                {FORMATS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Language filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-400 font-medium">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as any)}
                aria-label="Filter movies by language"
                className="bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-md px-2.5 py-1 text-xs focus:outline-none focus:border-rose-500"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Reset button if filters active */}
            {(selectedGenre !== 'All' || selectedFormat !== 'All' || selectedLanguage !== 'All') && (
              <button
                onClick={() => {
                  setSelectedGenre('All');
                  setSelectedFormat('All');
                  setSelectedLanguage('All');
                }}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium underline"
              >
                Reset
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
