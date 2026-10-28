import React, { useState } from 'react';
import {
  Film,
  MapPin,
  Search,
  Wallet,
  User,
  ShieldCheck,
  Menu,
  X,
  Ticket,
  LayoutGrid,
  Building2,
  FolderKanban
} from 'lucide-react';
import { useApp, ActiveView } from '../context/AppContext';
import { City } from '../types';

const CITIES: City[] = ['Mumbai', 'Delhi-NCR', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai'];

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    city,
    setCity,
    searchQuery,
    setSearchQuery,
    user,
    toggleUserRole,
    bookings
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const activeBookingsCount = bookings.filter((b) => b.status === 'CONFIRMED').length;

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      {/* Top 3-Zone Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-950/40 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                IMOVIES
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-neutral-400 font-normal">
                Cinema Booking
              </span>
            </div>
          </button>

          {/* City Selector */}
          <div className="relative ml-2">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{city}</span>
            </button>

            {cityDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setCityDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-1 w-40 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl py-1.5 z-20">
                  <div className="px-3 py-1 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Select Location
                  </div>
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCity(c);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                        city === c
                          ? 'text-rose-400 bg-rose-950/30 font-medium'
                          : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {c}
                      {city === c && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Zone 2: Navigation Links (single line, whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'home' || activeView === 'movie-detail'
                ? 'text-white border-b-2 border-rose-500 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => handleNavClick('cinemas')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'cinemas'
                ? 'text-white border-b-2 border-rose-500 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Theatres & Screens
          </button>
          <button
            onClick={() => handleNavClick('my-bookings')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeView === 'my-bookings' || activeView === 'booking-confirmed'
                ? 'text-white border-b-2 border-rose-500 font-semibold'
                : 'hover:text-white'
            }`}
          >
            My Tickets
            {activeBookingsCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 text-[10px] bg-rose-600 text-white rounded-full font-bold">
                {activeBookingsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('skillwallet')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'skillwallet'
                ? 'text-white border-b-2 border-rose-500 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Skill Wallet
          </button>
          <button
            onClick={() => handleNavClick('project-workspace')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'project-workspace'
                ? 'text-white border-b-2 border-rose-500 font-semibold'
                : 'hover:text-white'
            }`}
          >
            MERN Specs
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeView === 'admin'
                ? 'text-amber-400 border-b-2 border-amber-500 font-semibold'
                : 'text-neutral-400 hover:text-amber-400'
            }`}
          >
            Partner Admin
          </button>
        </nav>

        {/* Zone 3: Primary Action & SkillWallet Credits & User Session */}
        <div className="flex items-center gap-3 shrink-0">
          {/* SkillWallet Credits Indicator */}
          <button
            onClick={() => handleNavClick('skillwallet')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs transition-colors"
            title="SkillWallet Balance"
          >
            <Wallet className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300 tabular-nums">
              {user.skillCredits}
            </span>
            <span className="text-neutral-400 font-normal">Credits</span>
          </button>

          {/* Role switcher / User Avatar */}
          <button
            onClick={toggleUserRole}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all text-xs"
            title={`Current: ${user.role === 'admin' ? 'Cinema Admin' : 'Customer (SJ)'}. Click to switch role.`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
              user.role === 'admin' ? 'bg-amber-600 text-neutral-950' : 'bg-rose-600 text-white'
            }`}>
              {user.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : user.initials}
            </div>
            <span className="font-medium text-neutral-200 hidden sm:inline">
              {user.role === 'admin' ? 'Admin Hub' : user.name.split(' ')[0]}
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sub-bar with Live Search & Fast Filter Input */}
      <div className="bg-neutral-900/60 border-t border-neutral-850 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search for Movies, Cinemas, Genres, or Formats (e.g. IMAX, Sci-Fi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-neutral-950/80 border border-neutral-800 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-neutral-400">
            <span>Now Showing in <strong className="text-neutral-200">{city}</strong></span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">Real-Time Seat Booking</span>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-neutral-200">{user.skillCredits} Skill Credits</span>
            </div>
            <button
              onClick={() => handleNavClick('skillwallet')}
              className="text-xs text-rose-400 font-medium hover:underline"
            >
              Top Up
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-neutral-900 text-neutral-200 text-xs font-medium"
            >
              <Film className="w-4 h-4 text-rose-500" />
              Movies
            </button>
            <button
              onClick={() => handleNavClick('cinemas')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-neutral-900 text-neutral-200 text-xs font-medium"
            >
              <Building2 className="w-4 h-4 text-rose-500" />
              Theatres
            </button>
            <button
              onClick={() => handleNavClick('my-bookings')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-neutral-900 text-neutral-200 text-xs font-medium"
            >
              <Ticket className="w-4 h-4 text-rose-500" />
              My Tickets ({activeBookingsCount})
            </button>
            <button
              onClick={() => handleNavClick('skillwallet')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-neutral-900 text-neutral-200 text-xs font-medium"
            >
              <Wallet className="w-4 h-4 text-amber-400" />
              Skill Wallet
            </button>
            <button
              onClick={() => handleNavClick('project-workspace')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-neutral-900 text-neutral-200 text-xs font-medium"
            >
              <FolderKanban className="w-4 h-4 text-cyan-400" />
              MERN Specs
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-neutral-900 text-amber-400 text-xs font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Partner Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
