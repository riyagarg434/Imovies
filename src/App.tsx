/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MovieFilterBar } from './components/MovieFilterBar';
import { MovieGrid } from './components/MovieGrid';
import { MovieDetailView } from './components/MovieDetailView';
import { SeatSelectionView } from './components/SeatSelectionView';
import { CheckoutView } from './components/CheckoutView';
import { TicketConfirmationView } from './components/TicketConfirmationView';
import { MyBookingsView } from './components/MyBookingsView';
import { CinemasListView } from './components/CinemasListView';
import { SkillWalletView } from './components/SkillWalletView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { ProjectWorkspaceView } from './components/ProjectWorkspaceView';
import { TrailerModal } from './components/TrailerModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Bar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroBanner />
            <MovieFilterBar />
            <MovieGrid />
          </>
        )}

        {activeView === 'movie-detail' && <MovieDetailView />}
        {activeView === 'seat-selection' && <SeatSelectionView />}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'booking-confirmed' && <TicketConfirmationView />}
        {activeView === 'my-bookings' && <MyBookingsView />}
        {activeView === 'cinemas' && <CinemasListView />}
        {activeView === 'skillwallet' && <SkillWalletView />}
        {activeView === 'admin' && <AdminDashboardView />}
        {activeView === 'project-workspace' && <ProjectWorkspaceView />}
      </main>

      {/* Global Modals & Overlays */}
      <TrailerModal />
      <ToastContainer />

      {/* Footer */}
      {activeView !== 'seat-selection' && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
