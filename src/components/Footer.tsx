import React from 'react';
import { Film, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white">
                <Film className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight font-display">
                IMOVIES
              </span>
            </div>
            <p className="text-neutral-500 text-xs">
              Cinema ticket booking made simple · Built with modern MERN Architecture & SkillWallet.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400">
            <button
              onClick={() => setActiveView('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Movies
            </button>
            <button
              onClick={() => setActiveView('cinemas')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Theatres
            </button>
            <button
              onClick={() => setActiveView('my-bookings')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              My Tickets
            </button>
            <button
              onClick={() => setActiveView('skillwallet')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Skill Wallet
            </button>
            <button
              onClick={() => setActiveView('project-workspace')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              MERN Specs
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Partner Admin
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <div>
            © 2026 IMovies. All rights reserved. Registered trademark of Cinema Entertainment Systems.
          </div>
          <div className="flex items-center gap-3">
            <span>256-Bit SSL Encrypted</span>
            <span>·</span>
            <span>PCI-DSS Compliant</span>
            <span>·</span>
            <span>JWT Secure Sessions</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
