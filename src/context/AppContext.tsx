import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  City,
  Movie,
  Cinema,
  Showtime,
  Booking,
  UserProfile,
  SnackItem,
  SelectedSnack,
  MovieGenre,
  MovieLanguage,
  MovieFormat,
  ProjectEpic,
  ProjectTask
} from '../types';
import {
  INITIAL_USER,
  INITIAL_MOVIES,
  INITIAL_CINEMAS,
  INITIAL_SHOWTIMES,
  INITIAL_SNACKS,
  INITIAL_BOOKINGS,
  INITIAL_EPICS,
  INITIAL_TASKS
} from '../data/initialData';

export type ActiveView =
  | 'home'
  | 'movie-detail'
  | 'seat-selection'
  | 'checkout'
  | 'booking-confirmed'
  | 'my-bookings'
  | 'cinemas'
  | 'skillwallet'
  | 'admin'
  | 'project-workspace';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  city: City;
  setCity: (city: City) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGenre: MovieGenre | 'All';
  setSelectedGenre: (g: MovieGenre | 'All') => void;
  selectedLanguage: MovieLanguage | 'All';
  setSelectedLanguage: (l: MovieLanguage | 'All') => void;
  selectedFormat: MovieFormat | 'All';
  setSelectedFormat: (f: MovieFormat | 'All') => void;
  selectedDate: string;
  setSelectedDate: (d: string) => void;

  movies: Movie[];
  cinemas: Cinema[];
  showtimes: Showtime[];
  snacks: SnackItem[];
  bookings: Booking[];
  user: UserProfile;
  epics: ProjectEpic[];
  tasks: ProjectTask[];

  // Current Booking Workflow
  activeMovie: Movie | null;
  activeCinema: Cinema | null;
  activeShowtime: Showtime | null;
  selectedSeatIds: string[];
  selectedSnacks: SelectedSnack[];
  latestConfirmedBooking: Booking | null;

  // Trailer modal state
  activeTrailerMovie: Movie | null;
  openTrailerModal: (movie: Movie) => void;
  closeTrailerModal: () => void;

  // Actions
  selectMovieForDetails: (movie: Movie) => void;
  selectShowtimeForBooking: (movie: Movie, cinema: Cinema, showtime: Showtime) => void;
  toggleSeat: (seatId: string) => void;
  updateSnackQuantity: (snack: SnackItem, delta: number) => void;
  proceedToCheckout: () => void;
  confirmBooking: (
    paymentMethod: 'Skill Credits' | 'UPI' | 'Credit/Debit Card' | 'NetBanking',
    creditsToUse: number
  ) => Booking;
  cancelBooking: (bookingId: string) => void;
  addSkillCredits: (amount: number) => void;
  toggleUserRole: () => void;
  addMovie: (newMovieData: Omit<Movie, 'id' | 'rating' | 'voteCount' | 'reviews'>) => void;
  addShowtime: (newShowData: Omit<Showtime, 'id' | 'bookedSeatIds'>) => void;
  cancelCurrentBookingFlow: () => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [city, setCity] = useState<City>('Mumbai');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<MovieGenre | 'All'>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<MovieLanguage | 'All'>('All');
  const [selectedFormat, setSelectedFormat] = useState<MovieFormat | 'All'>('All');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-28');

  // Stored state with localStorage backup
  const [movies, setMovies] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem('imovies_movies');
      return saved ? JSON.parse(saved) : INITIAL_MOVIES;
    } catch {
      return INITIAL_MOVIES;
    }
  });

  const [cinemas] = useState<Cinema[]>(INITIAL_CINEMAS);

  const [showtimes, setShowtimes] = useState<Showtime[]>(() => {
    try {
      const saved = localStorage.getItem('imovies_showtimes');
      return saved ? JSON.parse(saved) : INITIAL_SHOWTIMES;
    } catch {
      return INITIAL_SHOWTIMES;
    }
  });

  const [snacks] = useState<SnackItem[]>(INITIAL_SNACKS);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('imovies_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('imovies_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [epics] = useState<ProjectEpic[]>(INITIAL_EPICS);
  const [tasks] = useState<ProjectTask[]>(INITIAL_TASKS);

  // Active booking workflow
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [activeCinema, setActiveCinema] = useState<Cinema | null>(null);
  const [activeShowtime, setActiveShowtime] = useState<Showtime | null>(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<SelectedSnack[]>([]);
  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState<Booking | null>(null);

  // Trailer modal
  const [activeTrailerMovie, setActiveTrailerMovie] = useState<Movie | null>(null);

  // Toast
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('imovies_movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('imovies_showtimes', JSON.stringify(showtimes));
  }, [showtimes]);

  useEffect(() => {
    localStorage.setItem('imovies_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('imovies_user', JSON.stringify(user));
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openTrailerModal = (movie: Movie) => {
    setActiveTrailerMovie(movie);
  };

  const closeTrailerModal = () => {
    setActiveTrailerMovie(null);
  };

  const selectMovieForDetails = (movie: Movie) => {
    setActiveMovie(movie);
    setActiveView('movie-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectShowtimeForBooking = (movie: Movie, cinema: Cinema, showtime: Showtime) => {
    setActiveMovie(movie);
    setActiveCinema(cinema);
    setActiveShowtime(showtime);
    setSelectedSeatIds([]);
    setSelectedSnacks([]);
    setActiveView('seat-selection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSeat = (seatId: string) => {
    if (!activeShowtime) return;

    if (activeShowtime.bookedSeatIds.includes(seatId)) {
      showToast(`Seat ${seatId} is already occupied`, 'warning');
      return;
    }

    if (selectedSeatIds.includes(seatId)) {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seatId));
    } else {
      if (selectedSeatIds.length >= 8) {
        showToast('Maximum 8 tickets allowed per transaction', 'warning');
        return;
      }
      setSelectedSeatIds((prev) => [...prev, seatId]);
    }
  };

  const updateSnackQuantity = (snack: SnackItem, delta: number) => {
    setSelectedSnacks((prev) => {
      const existing = prev.find((s) => s.item.id === snack.id);
      if (!existing && delta > 0) {
        return [...prev, { item: snack, quantity: delta }];
      }
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prev.filter((s) => s.item.id !== snack.id);
        }
        return prev.map((s) => (s.item.id === snack.id ? { ...s, quantity: newQty } : s));
      }
      return prev;
    });
  };

  const proceedToCheckout = () => {
    if (selectedSeatIds.length === 0) {
      showToast('Please select at least 1 seat to proceed', 'warning');
      return;
    }
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelCurrentBookingFlow = () => {
    setSelectedSeatIds([]);
    setSelectedSnacks([]);
    setActiveView(activeMovie ? 'movie-detail' : 'home');
  };

  const confirmBooking = (
    paymentMethod: 'Skill Credits' | 'UPI' | 'Credit/Debit Card' | 'NetBanking',
    creditsToUse: number
  ): Booking => {
    if (!activeMovie || !activeCinema || !activeShowtime || selectedSeatIds.length === 0) {
      throw new Error('Incomplete booking information');
    }

    // Determine seat price based on seat tier
    let ticketTotal = 0;
    selectedSeatIds.forEach((seatId) => {
      const row = seatId.charAt(0);
      if (row === 'A' || row === 'B') {
        ticketTotal += activeShowtime.pricing.platinum;
      } else if (row === 'C' || row === 'D' || row === 'E' || row === 'F') {
        ticketTotal += activeShowtime.pricing.gold;
      } else {
        ticketTotal += activeShowtime.pricing.silver;
      }
    });

    const snackTotal = selectedSnacks.reduce((sum, s) => sum + s.item.price * s.quantity, 0);
    const convenienceFee = Math.round(selectedSeatIds.length * 35);
    const taxes = Math.round((ticketTotal + convenienceFee) * 0.05);
    const grandTotal = ticketTotal + snackTotal + convenienceFee + taxes;

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingCode = `IMV-${randomSuffix}-BMS`;

    const newBooking: Booking = {
      id: `bkg_${Date.now()}`,
      bookingCode,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      movieId: activeMovie.id,
      movieTitle: activeMovie.title,
      moviePoster: activeMovie.posterUrl,
      movieCertificate: activeMovie.certificate,
      movieFormat: activeShowtime.format,
      movieLanguage: activeMovie.languages[0],
      cinemaId: activeCinema.id,
      cinemaName: activeCinema.name,
      cinemaAddress: activeCinema.address,
      auditorium: activeShowtime.auditorium,
      showDate: activeShowtime.date,
      showTime: activeShowtime.time,
      seats: [...selectedSeatIds].sort(),
      seatTiers: `${selectedSeatIds.length} Cinema Ticket${selectedSeatIds.length > 1 ? 's' : ''}`,
      ticketAmount: ticketTotal,
      convenienceFee,
      taxes,
      snackAmount: snackTotal,
      totalAmount: grandTotal,
      paidWithCredits: creditsToUse > 0,
      creditsUsed: creditsToUse,
      paymentMethod,
      bookedAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'CONFIRMED',
      snacks: [...selectedSnacks]
    };

    // Update showtime booked seats so they appear occupied in real-time
    setShowtimes((prev) =>
      prev.map((st) => {
        if (st.id === activeShowtime.id) {
          return {
            ...st,
            bookedSeatIds: [...st.bookedSeatIds, ...selectedSeatIds]
          };
        }
        return st;
      })
    );

    // Deduct credits if used
    if (creditsToUse > 0) {
      setUser((prev) => ({
        ...prev,
        skillCredits: Math.max(0, prev.skillCredits - creditsToUse)
      }));
    }

    // Save booking
    setBookings((prev) => [newBooking, ...prev]);
    setLatestConfirmedBooking(newBooking);
    setActiveView('booking-confirmed');

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    showToast(`Booking ${bookingCode} confirmed successfully!`, 'success');
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    if (booking.status === 'CANCELLED') {
      showToast('This ticket is already cancelled', 'warning');
      return;
    }

    // Release seats in showtime
    setShowtimes((prev) =>
      prev.map((st) => {
        if (st.movieId === booking.movieId && st.time === booking.showTime && st.date === booking.showDate) {
          return {
            ...st,
            bookedSeatIds: st.bookedSeatIds.filter((id) => !booking.seats.includes(id))
          };
        }
        return st;
      })
    );

    // Mark as cancelled
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );

    // Refund credits or cash credit to SkillWallet
    const refundCredits = booking.creditsUsed > 0 ? booking.creditsUsed : Math.floor(booking.totalAmount * 0.9);
    setUser((prev) => ({
      ...prev,
      skillCredits: prev.skillCredits + refundCredits
    }));

    showToast(
      `Booking ${booking.bookingCode} cancelled. ₹${refundCredits} credits refunded to your SkillWallet!`,
      'info'
    );
  };

  const addSkillCredits = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      skillCredits: prev.skillCredits + amount
    }));
    showToast(`Added ${amount} Skill Credits to your wallet!`, 'success');
  };

  const toggleUserRole = () => {
    setUser((prev) => {
      const nextRole = prev.role === 'admin' ? 'user' : 'admin';
      showToast(`Switched view to ${nextRole === 'admin' ? 'Cinema Admin' : 'Customer (SJ)'}`, 'info');
      return {
        ...prev,
        role: nextRole
      };
    });
  };

  const addMovie = (newMovieData: Omit<Movie, 'id' | 'rating' | 'voteCount' | 'reviews'>) => {
    const newMovie: Movie = {
      ...newMovieData,
      id: `mov_${Date.now()}`,
      rating: 9.0,
      voteCount: 1,
      reviews: []
    };
    setMovies((prev) => [newMovie, ...prev]);
    showToast(`Movie "${newMovie.title}" successfully published to catalogue!`, 'success');
  };

  const addShowtime = (newShowData: Omit<Showtime, 'id' | 'bookedSeatIds'>) => {
    const newShow: Showtime = {
      ...newShowData,
      id: `st_${Date.now()}`,
      bookedSeatIds: []
    };
    setShowtimes((prev) => [newShow, ...prev]);
    showToast(`New showtime added for ${newShow.time}!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        city,
        setCity,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        selectedLanguage,
        setSelectedLanguage,
        selectedFormat,
        setSelectedFormat,
        selectedDate,
        setSelectedDate,
        movies,
        cinemas,
        showtimes,
        snacks,
        bookings,
        user,
        epics,
        tasks,
        activeMovie,
        activeCinema,
        activeShowtime,
        selectedSeatIds,
        selectedSnacks,
        latestConfirmedBooking,
        activeTrailerMovie,
        openTrailerModal,
        closeTrailerModal,
        selectMovieForDetails,
        selectShowtimeForBooking,
        toggleSeat,
        updateSnackQuantity,
        proceedToCheckout,
        confirmBooking,
        cancelBooking,
        addSkillCredits,
        toggleUserRole,
        addMovie,
        addShowtime,
        cancelCurrentBookingFlow,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
