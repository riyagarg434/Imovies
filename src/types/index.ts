export type City = 'Mumbai' | 'Delhi-NCR' | 'Bengaluru' | 'Hyderabad' | 'Pune' | 'Chennai';

export type MovieFormat = '2D' | '3D' | 'IMAX 3D' | 'IMAX 2D' | '4DX';
export type MovieLanguage = 'Hindi' | 'English' | 'Telugu' | 'Tamil' | 'Kannada' | 'Malayalam' | 'Japanese';
export type MovieGenre = 'Action' | 'Sci-Fi' | 'Thriller' | 'Drama' | 'Comedy' | 'Animation' | 'Adventure' | 'Fantasy';

export interface CastMember {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number; // out of 10
  date: string;
  comment: string;
  likes: number;
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  heroBannerUrl?: string;
  trailerUrl?: string;
  rating: number; // e.g. 9.1
  voteCount: number;
  durationMinutes: number;
  genres: MovieGenre[];
  languages: MovieLanguage[];
  formats: MovieFormat[];
  certificate: 'U' | 'UA 13+' | 'UA 16+' | 'A 18+';
  releaseDate: string;
  isNowShowing: boolean;
  cast: CastMember[];
  director: string;
  cancellationAllowed: boolean;
  reviews: Review[];
}

export type SeatTier = 'PLATINUM' | 'GOLD' | 'SILVER';

export interface SeatInfo {
  id: string; // e.g., 'A1', 'E8'
  row: string; // 'A'
  number: number; // 1
  tier: SeatTier;
  price: number;
  isBooked: boolean;
  isSelected?: boolean;
  isWheelchair?: boolean;
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  auditorium: string; // e.g. "Audi 2 - Laser IMAX"
  time: string; // "10:30 AM"
  date: string; // "2026-10-28"
  format: MovieFormat;
  sound: 'Dolby Atmos 7.1' | 'Dolby Digital 5.1' | 'IMAX 12-Track';
  status: 'Available' | 'Fast Filling' | 'Almost Full';
  pricing: {
    silver: number;
    gold: number;
    platinum: number;
  };
  bookedSeatIds: string[]; // List of already booked seat IDs for this showtime
}

export interface Cinema {
  id: string;
  name: string;
  chain: 'PVR INOX' | 'Cinépolis' | 'Miraj' | 'Carnival' | 'Independent';
  city: City;
  locality: string;
  address: string;
  distanceKm: number;
  features: string[]; // ['IMAX', 'Dolby Atmos', 'Recliner Seats', 'F&B Service', 'Wheelchair Friendly']
  showtimes?: Showtime[];
}

export interface SnackItem {
  id: string;
  name: string;
  category: 'Popcorn' | 'Snacks' | 'Beverages' | 'Combos';
  price: number;
  description: string;
  isVeg: boolean;
  imageUrl?: string;
}

export interface SelectedSnack {
  item: SnackItem;
  quantity: number;
}

export interface Booking {
  id: string;
  bookingCode: string; // e.g. 'IMV-89412-BMS'
  userId: string;
  userName: string;
  userEmail: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  movieCertificate: string;
  movieFormat: MovieFormat;
  movieLanguage: MovieLanguage;
  cinemaId: string;
  cinemaName: string;
  cinemaAddress: string;
  auditorium: string;
  showDate: string;
  showTime: string;
  seats: string[]; // ['E4', 'E5']
  seatTiers: string; // "Gold (2 Seats)"
  ticketAmount: number;
  convenienceFee: number;
  taxes: number;
  snackAmount: number;
  totalAmount: number;
  paidWithCredits: boolean;
  creditsUsed: number;
  paymentMethod: 'Skill Credits' | 'UPI' | 'Credit/Debit Card' | 'NetBanking';
  bookedAt: string;
  status: 'CONFIRMED' | 'CANCELLED';
  qrCodeUrl?: string;
  snacks?: SelectedSnack[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: 'user' | 'admin';
  skillCredits: number;
  aiTokens: number;
  jwtToken: string;
  phone: string;
}

export interface ProjectEpic {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  tasksCount: number;
  progressPercent: number;
}

export interface ProjectTask {
  id: string;
  epicId: string;
  title: string;
  category: 'Setup' | 'Backend' | 'Database' | 'Frontend' | 'Security' | 'DevOps';
  status: 'Backlog' | 'In Progress' | 'Review' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
}
