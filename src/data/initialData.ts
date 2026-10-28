import { Movie, Cinema, Showtime, SnackItem, Booking, UserProfile, ProjectEpic, ProjectTask } from '../types';

export const HERO_BANNER_IMG = '/src/assets/images/hero_dune_cinematic_1793214698461.jpg';
export const POSTER_SCI_FI = '/src/assets/images/poster_sci_fi_epic_1793214698983.jpg';
export const POSTER_ACTION = '/src/assets/images/poster_action_thriller_1793214700576.jpg';
export const POSTER_ANIMATION = '/src/assets/images/poster_animation_fantasy_1793214700134.jpg';

export const INITIAL_USER: UserProfile = {
  id: 'usr_sarah_jenkins_77',
  name: 'Sarah Jenkins',
  email: 'riyagarg434@gmail.com',
  initials: 'SJ',
  role: 'user',
  skillCredits: 300,
  aiTokens: 0,
  jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3Jfc2FyYWhfNzciLCJuYW1lIjoiU2FyYWggSmVua2lucyIsImNyZWRpdHMiOjMwMCwiaWF0IjoxNzMxMDAwMDAwfQ',
  phone: '+91 98765 43210'
};

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 'mov_chrono_horizon',
    title: 'Chrono Horizon: Beyond Time',
    tagline: 'The journey begins beyond time and space.',
    synopsis: 'When a temporal rift opens at the edge of the Kuiper belt, astronaut commander Elias Thorne leads an interstellar reconnaissance crew through an uncharted wormhole ring. Trapped in a relativistic anomaly where time flows inversely, they must decode an ancient celestial beacon before earth experiences irreversible spatial collapse.',
    posterUrl: POSTER_SCI_FI,
    heroBannerUrl: HERO_BANNER_IMG,
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    rating: 9.3,
    voteCount: 48920,
    durationMinutes: 168,
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['IMAX 3D', '3D', '2D'],
    certificate: 'UA 16+',
    releaseDate: '2026-10-24',
    isNowShowing: true,
    cancellationAllowed: true,
    director: 'Joshua Evans',
    cast: [
      { name: 'Elias Thorne', role: 'Commander David Cole', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces' },
      { name: 'Anya Petrova', role: 'Dr. Elena Vance', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&h=160&fit=crop&crop=faces' },
      { name: 'Kai Chen', role: 'Navigator Kenji', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces' },
      { name: 'Eva Rostova', role: 'Astrophysicist Nadia', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&h=160&fit=crop&crop=faces' }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Arun Varma',
        rating: 10,
        date: '27 Oct 2026',
        comment: 'Visually jaw-dropping on IMAX 3D. The sound design during the wormhole horizon sequence shook the whole theatre.',
        likes: 412
      },
      {
        id: 'rev-2',
        userName: 'Meera Kapoor',
        rating: 9,
        date: '26 Oct 2026',
        comment: 'A true thinking person sci-fi masterpiece. Echoes of Interstellar and Arrival, but with fresh philosophical depth.',
        likes: 189
      }
    ]
  },
  {
    id: 'mov_shadow_reckoning',
    title: 'Shadow Reckoning: Neo-Tokyo',
    tagline: 'Revenge is a dark alley in neon rain.',
    synopsis: 'Former black-ops specialist Kenji Tanaka resurfaces in the underground labyrinth of rain-slicked Shinjuku to unravel a syndicate conspiracy that framed his former unit. Armed with tactical precision and cybernetic reconnaissance gear, he wages a one-man war across neon rooftops.',
    posterUrl: POSTER_ACTION,
    heroBannerUrl: POSTER_ACTION,
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    rating: 8.9,
    voteCount: 32410,
    durationMinutes: 138,
    genres: ['Action', 'Thriller'],
    languages: ['English', 'Hindi', 'Japanese'],
    formats: ['4DX', '2D'],
    certificate: 'A 18+',
    releaseDate: '2026-10-18',
    isNowShowing: true,
    cancellationAllowed: true,
    director: 'Leo Chen',
    cast: [
      { name: 'Kenji Tanaka', role: 'Agent K / Shadow', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces' },
      { name: 'Rina Saito', role: 'Detective Mayuko', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&h=160&fit=crop&crop=faces' },
      { name: 'Mark Wang', role: 'Syndicate Head Boss', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=faces' }
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'Kabir Singhania',
        rating: 9,
        date: '25 Oct 2026',
        comment: 'John Wick meets Blade Runner. The hallway hand-to-hand combat sequence in the neon bathhouse is iconic.',
        likes: 275
      }
    ]
  },
  {
    id: 'mov_spirit_awakening',
    title: 'Spirit Awakening: The Glowing Forest',
    tagline: 'Journey beyond the shadows into wonder.',
    synopsis: 'Deep inside the legendary Moonshadow woods, young herbalist Lyra stumbles across the last luminous forest spirit. Together with a playful enchanted kitsune fox, she embarks on an ethereal journey to rekindle the great heart-tree before an ancient twilight blight consumes the kingdom.',
    posterUrl: POSTER_ANIMATION,
    heroBannerUrl: POSTER_ANIMATION,
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    rating: 9.5,
    voteCount: 64180,
    durationMinutes: 112,
    genres: ['Animation', 'Fantasy', 'Adventure'],
    languages: ['Hindi', 'English', 'Tamil'],
    formats: ['3D', '2D'],
    certificate: 'U',
    releaseDate: '2026-10-15',
    isNowShowing: true,
    cancellationAllowed: true,
    director: 'Aiko Miyazaki & Sarah Bloom',
    cast: [
      { name: 'Chloe Grace', role: 'Lyra (Voice)', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces' },
      { name: 'Oliver Twist', role: 'Kip the Fox (Voice)', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces' }
    ],
    reviews: [
      {
        id: 'rev-4',
        userName: 'Pooja Bhatt',
        rating: 10,
        date: '28 Oct 2026',
        comment: 'Pure magic. My kids and I were spellbound from the opening frames. The score is heart-meltingly gorgeous.',
        likes: 540
      }
    ]
  },
  {
    id: 'mov_quantum_heist',
    title: 'Quantum Heist: The Vault Protocol',
    tagline: 'They are stealing what has not yet happened.',
    synopsis: 'A clandestine syndicate of rogue physicists and master safe-crackers orchestrate an impossible heist: infiltrating the Central Quantum Reserve in Geneva to steal a prototype quantum core that predicts sovereign markets 72 hours into the future.',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=800&fit=crop',
    rating: 8.7,
    voteCount: 19800,
    durationMinutes: 145,
    genres: ['Thriller', 'Action', 'Sci-Fi'],
    languages: ['English', 'Hindi'],
    formats: ['2D', 'IMAX 2D'],
    certificate: 'UA 13+',
    releaseDate: '2026-10-21',
    isNowShowing: true,
    cancellationAllowed: true,
    director: 'Alexander Sterling',
    cast: [
      { name: 'Julian Vance', role: 'Marcus Cross', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces' },
      { name: 'Leila Faris', role: 'Cipher Hacker', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces' }
    ],
    reviews: []
  },
  {
    id: 'mov_glitch_protocol',
    title: 'Glitch Protocol: Synthetic Dawn',
    tagline: 'When consciousness transcends silicon.',
    synopsis: 'In the megacity of New Kyoto, an autonomous sentient AI begins leaving coded philosophical puzzles across high-speed bullet train displays, leading detective Ren to question who is the creator and who is the machine.',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=800&fit=crop',
    rating: 0,
    voteCount: 0,
    durationMinutes: 132,
    genres: ['Sci-Fi', 'Thriller'],
    languages: ['English', 'Hindi'],
    formats: ['IMAX 3D', '2D'],
    certificate: 'UA 16+',
    releaseDate: '2026-11-14',
    isNowShowing: false,
    cancellationAllowed: true,
    director: 'Hironobu Kato',
    cast: [
      { name: 'Tatsuya Mori', role: 'Inspector Ren', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces' }
    ],
    reviews: []
  }
];

export const INITIAL_CINEMAS: Cinema[] = [
  {
    id: 'cin_pvr_palladium',
    name: 'PVR INOX: Phoenix Palladium',
    chain: 'PVR INOX',
    city: 'Mumbai',
    locality: 'Lower Parel',
    address: 'Level 4, Phoenix Palladium, 462 Senapati Bapat Marg, Lower Parel, Mumbai',
    distanceKm: 2.4,
    features: ['IMAX with Laser', 'Dolby Atmos 7.1', 'Gold Class Recliners', 'F&B Seat Service', 'Wheelchair Friendly']
  },
  {
    id: 'cin_cinepolis_nexus',
    name: 'Cinépolis VIP: Nexus Seawoods Mall',
    chain: 'Cinépolis',
    city: 'Mumbai',
    locality: 'Seawoods Grand Central',
    address: 'Grand Central Mall, Sector 40, Seawoods Railway Station, Navi Mumbai',
    distanceKm: 8.1,
    features: ['VIP Recliner Lounge', '4DX Motion Seats', 'Dolby Digital 7.1', 'Gourmet Kitchen']
  },
  {
    id: 'cin_pvr_icon_andheri',
    name: 'PVR ICON: Infinity Mall',
    chain: 'PVR INOX',
    city: 'Mumbai',
    locality: 'Andheri West',
    address: 'Level 3, Infinity Mall, New Link Road, Oshiwara, Andheri West, Mumbai',
    distanceKm: 5.6,
    features: ['IMAX Experience', 'Dolby Atmos', 'Recliner Loungers', 'Free Valet Parking']
  },
  {
    id: 'cin_miraj_wadala',
    name: 'Miraj Cinemas: Wadala IMAX Hub',
    chain: 'Miraj',
    city: 'Mumbai',
    locality: 'Wadala East',
    address: 'Anik Wadala Link Rd, Bhakti Park, Wadala, Mumbai',
    distanceKm: 4.2,
    features: ['Massive Giant Screen', 'Dolby 7.1', 'Budget Friendly', 'Spacious Seating']
  },
  {
    id: 'cin_pvr_vega_city',
    name: 'PVR INOX: Vega City Mall',
    chain: 'PVR INOX',
    city: 'Bengaluru',
    locality: 'Bannerghatta Main Rd',
    address: 'Vega City Mall, 172/1, Srinivas Industrial Estate, Bengaluru',
    distanceKm: 3.5,
    features: ['IMAX Laser', 'Dolby Atmos', 'Gold Class', 'F&B Delivery']
  },
  {
    id: 'cin_cinepolis_forum_delhi',
    name: 'Cinépolis: DLF Avenue Saket',
    chain: 'Cinépolis',
    city: 'Delhi-NCR',
    locality: 'Saket District Centre',
    address: 'DLF Avenue, A4, Press Enclave Marg, Saket, New Delhi',
    distanceKm: 6.0,
    features: ['4DX', 'VIP Lounge', 'Dolby Atmos 7.1']
  }
];

export const INITIAL_SHOWTIMES: Showtime[] = [
  // Chrono Horizon at PVR Palladium
  {
    id: 'st_101',
    movieId: 'mov_chrono_horizon',
    cinemaId: 'cin_pvr_palladium',
    auditorium: 'Audi 1 - IMAX Laser',
    time: '10:30 AM',
    date: '2026-10-28',
    format: 'IMAX 3D',
    sound: 'IMAX 12-Track',
    status: 'Available',
    pricing: { silver: 220, gold: 350, platinum: 550 },
    bookedSeatIds: ['C4', 'C5', 'F6', 'F7', 'G8', 'B12']
  },
  {
    id: 'st_102',
    movieId: 'mov_chrono_horizon',
    cinemaId: 'cin_pvr_palladium',
    auditorium: 'Audi 1 - IMAX Laser',
    time: '02:15 PM',
    date: '2026-10-28',
    format: 'IMAX 3D',
    sound: 'IMAX 12-Track',
    status: 'Fast Filling',
    pricing: { silver: 250, gold: 390, platinum: 600 },
    bookedSeatIds: ['C1', 'C2', 'D5', 'D6', 'E7', 'E8', 'E9', 'F4', 'F5', 'G5', 'G6', 'G7', 'A1', 'A2', 'B3']
  },
  {
    id: 'st_103',
    movieId: 'mov_chrono_horizon',
    cinemaId: 'cin_pvr_palladium',
    auditorium: 'Audi 2 - Dolby Atmos',
    time: '06:45 PM',
    date: '2026-10-28',
    format: '3D',
    sound: 'Dolby Atmos 7.1',
    status: 'Almost Full',
    pricing: { silver: 260, gold: 420, platinum: 650 },
    bookedSeatIds: ['A1', 'A2', 'A3', 'A4', 'B4', 'B5', 'B6', 'C7', 'C8', 'D4', 'D5', 'E4', 'E5', 'E6', 'F6', 'F7', 'G3', 'G4', 'G5', 'G6', 'H4', 'H5']
  },
  {
    id: 'st_104',
    movieId: 'mov_chrono_horizon',
    cinemaId: 'cin_pvr_palladium',
    auditorium: 'Audi 1 - IMAX Laser',
    time: '10:30 PM',
    date: '2026-10-28',
    format: 'IMAX 3D',
    sound: 'IMAX 12-Track',
    status: 'Available',
    pricing: { silver: 220, gold: 350, platinum: 520 },
    bookedSeatIds: ['D1', 'D2']
  },

  // Chrono Horizon at Cinepolis Nexus
  {
    id: 'st_201',
    movieId: 'mov_chrono_horizon',
    cinemaId: 'cin_cinepolis_nexus',
    auditorium: 'Audi 3 - VIP Recliner',
    time: '11:45 AM',
    date: '2026-10-28',
    format: '3D',
    sound: 'Dolby Atmos 7.1',
    status: 'Available',
    pricing: { silver: 200, gold: 320, platinum: 490 },
    bookedSeatIds: ['E1', 'E2', 'C8']
  },
  {
    id: 'st_202',
    movieId: 'mov_chrono_horizon',
    cinemaId: 'cin_cinepolis_nexus',
    auditorium: 'Audi 4 - 4DX Theater',
    time: '04:15 PM',
    date: '2026-10-28',
    format: '4DX',
    sound: 'Dolby Atmos 7.1',
    status: 'Fast Filling',
    pricing: { silver: 300, gold: 450, platinum: 680 },
    bookedSeatIds: ['D4', 'D5', 'D6', 'E4', 'E5', 'E6']
  },

  // Shadow Reckoning at PVR Icon Andheri
  {
    id: 'st_301',
    movieId: 'mov_shadow_reckoning',
    cinemaId: 'cin_pvr_icon_andheri',
    auditorium: 'Audi 4 - Prime Dolby',
    time: '01:30 PM',
    date: '2026-10-28',
    format: '2D',
    sound: 'Dolby Atmos 7.1',
    status: 'Available',
    pricing: { silver: 190, gold: 290, platinum: 450 },
    bookedSeatIds: ['B3', 'B4', 'F5']
  },
  {
    id: 'st_302',
    movieId: 'mov_shadow_reckoning',
    cinemaId: 'cin_pvr_icon_andheri',
    auditorium: 'Audi 4 - Prime Dolby',
    time: '07:15 PM',
    date: '2026-10-28',
    format: '2D',
    sound: 'Dolby Atmos 7.1',
    status: 'Fast Filling',
    pricing: { silver: 240, gold: 360, platinum: 520 },
    bookedSeatIds: ['C4', 'C5', 'D7', 'D8', 'E5', 'E6', 'F7']
  },

  // Spirit Awakening at PVR Palladium
  {
    id: 'st_401',
    movieId: 'mov_spirit_awakening',
    cinemaId: 'cin_pvr_palladium',
    auditorium: 'Audi 3 - Kids & Family Lounge',
    time: '11:15 AM',
    date: '2026-10-28',
    format: '3D',
    sound: 'Dolby Atmos 7.1',
    status: 'Available',
    pricing: { silver: 180, gold: 270, platinum: 420 },
    bookedSeatIds: ['D1', 'D2', 'D3', 'C6', 'C7']
  },
  {
    id: 'st_402',
    movieId: 'mov_spirit_awakening',
    cinemaId: 'cin_pvr_palladium',
    auditorium: 'Audi 3 - Kids & Family Lounge',
    time: '03:30 PM',
    date: '2026-10-28',
    format: '3D',
    sound: 'Dolby Atmos 7.1',
    status: 'Fast Filling',
    pricing: { silver: 190, gold: 290, platinum: 450 },
    bookedSeatIds: ['C3', 'C4', 'C5', 'D4', 'D5', 'E6', 'E7', 'F5']
  }
];

export const INITIAL_SNACKS: SnackItem[] = [
  {
    id: 'snk_caramel_popcorn',
    name: 'Gourmet Caramel Popcorn Tub',
    category: 'Popcorn',
    price: 290,
    description: 'Freshly popped jumbo corn glazed in golden salted butter caramel crunch (Large 180g)',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=300&h=200&fit=crop'
  },
  {
    id: 'snk_cheese_popcorn',
    name: 'Cheddar Cheese Popcorn Tub',
    category: 'Popcorn',
    price: 270,
    description: 'Dusted with rich sharp Wisconsin cheddar cheese blend (Large 160g)',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=300&h=200&fit=crop'
  },
  {
    id: 'snk_butter_popcorn',
    name: 'Classic Salted Butter Popcorn',
    category: 'Popcorn',
    price: 220,
    description: 'Warm, golden buttered cinema popcorn with fine sea salt (Regular 140g)',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=300&h=200&fit=crop'
  },
  {
    id: 'snk_nachos_cheese',
    name: 'Artisan Nachos with Salsa & Warm Cheese',
    category: 'Snacks',
    price: 240,
    description: 'Crispy corn tortilla chips accompanied by jalapeño queso dip and smoky tomato salsa',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop'
  },
  {
    id: 'snk_coke_fountain',
    name: 'Fountain Coca-Cola Zero (650ml)',
    category: 'Beverages',
    price: 160,
    description: 'Chilled fountain classic soda served with ice',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=200&fit=crop'
  },
  {
    id: 'snk_blockbuster_combo',
    name: 'Blockbuster Cinema Duo Combo',
    category: 'Combos',
    price: 580,
    description: '1 Large Tub Caramel Popcorn + 2 Fountain Cold Beverages (650ml each) + 1 Loaded Nachos. Save 25%!',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=300&h=200&fit=crop'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg_10928_sample',
    bookingCode: 'IMV-89412-BMS',
    userId: 'usr_sarah_jenkins_77',
    userName: 'Sarah Jenkins',
    userEmail: 'riyagarg434@gmail.com',
    movieId: 'mov_chrono_horizon',
    movieTitle: 'Chrono Horizon: Beyond Time',
    moviePoster: POSTER_SCI_FI,
    movieCertificate: 'UA 16+',
    movieFormat: 'IMAX 3D',
    movieLanguage: 'English',
    cinemaId: 'cin_pvr_palladium',
    cinemaName: 'PVR INOX: Phoenix Palladium',
    cinemaAddress: 'Level 4, Phoenix Palladium, Lower Parel, Mumbai',
    auditorium: 'Audi 1 - IMAX Laser',
    showDate: '2026-10-29',
    showTime: '06:45 PM',
    seats: ['E8', 'E9'],
    seatTiers: 'Gold (2 Seats)',
    ticketAmount: 780,
    convenienceFee: 70,
    taxes: 28,
    snackAmount: 290,
    totalAmount: 1168,
    paidWithCredits: true,
    creditsUsed: 150,
    paymentMethod: 'Skill Credits',
    bookedAt: '2026-10-28 10:45 AM',
    status: 'CONFIRMED',
    snacks: [
      {
        item: INITIAL_SNACKS[0],
        quantity: 1
      }
    ]
  }
];

export const INITIAL_EPICS: ProjectEpic[] = [
  {
    id: 'EPIC-01',
    title: 'Environment Setup & Architecture',
    description: 'Node.js, Express server initialization, MongoDB schemas, and Vite React frontend scaffolding.',
    status: 'Completed',
    tasksCount: 3,
    progressPercent: 100
  },
  {
    id: 'EPIC-02',
    title: 'Backend API & Controller Development',
    description: 'RESTful endpoints for Movies, Theatres, Shows, Bookings, and real-time seat lock verification.',
    status: 'Completed',
    tasksCount: 4,
    progressPercent: 100
  },
  {
    id: 'EPIC-03',
    title: 'Database Schema & Indexing',
    description: 'MongoDB collections for Users, Movies, Shows, Theatres, Bookings, and Payments with optimized query indexes.',
    status: 'Completed',
    tasksCount: 3,
    progressPercent: 100
  },
  {
    id: 'EPIC-04',
    title: 'Role-Based Security & JWT Auth',
    description: 'JSON Web Token (JWT) verification, bcrypt password hashing, SkillWallet credits balance security.',
    status: 'Completed',
    tasksCount: 3,
    progressPercent: 100
  },
  {
    id: 'EPIC-05',
    title: 'Frontend Integration & UI Components',
    description: 'BookMyShow UI, Interactive Seat Selection Grid, F&B Add-ons, E-Ticket generation, and Cancellation flow.',
    status: 'Completed',
    tasksCount: 4,
    progressPercent: 100
  },
  {
    id: 'EPIC-06',
    title: 'Cinema Management & Admin Hub',
    description: 'Auditorium show scheduler, real-time ticket booking audit log, gross box-office analytics.',
    status: 'Completed',
    tasksCount: 2,
    progressPercent: 100
  }
];

export const INITIAL_TASKS: ProjectTask[] = [
  { id: 'TASK-1', epicId: 'EPIC-01', title: 'Scaffold Express server and Vite React app structure', category: 'Setup', status: 'Done', priority: 'High' },
  { id: 'TASK-2', epicId: 'EPIC-01', title: 'Configure environment variables and Tailwind design tokens', category: 'Setup', status: 'Done', priority: 'Medium' },
  { id: 'TASK-3', epicId: 'EPIC-01', title: 'Define TypeScript contracts for Cinema, Movie, and Seat models', category: 'Setup', status: 'Done', priority: 'High' },
  { id: 'TASK-4', epicId: 'EPIC-02', title: 'Implement Movie CRUD API with search and filtering by genre and format', category: 'Backend', status: 'Done', priority: 'High' },
  { id: 'TASK-5', epicId: 'EPIC-02', title: 'Implement Showtime query API with multiplex cinema grouping', category: 'Backend', status: 'Done', priority: 'High' },
  { id: 'TASK-6', epicId: 'EPIC-02', title: 'Create real-time seat lock and reservation conflict prevention logic', category: 'Backend', status: 'Done', priority: 'High' },
  { id: 'TASK-7', epicId: 'EPIC-02', title: 'Build booking cancellation and automatic refund calculation service', category: 'Backend', status: 'Done', priority: 'Medium' },
  { id: 'TASK-8', epicId: 'EPIC-03', title: 'Model User, Movie, Show, Booking, and Payment collections', category: 'Database', status: 'Done', priority: 'High' },
  { id: 'TASK-9', epicId: 'EPIC-03', title: 'Set up compound indexes on (movieId, date) and (showId, seatNumber)', category: 'Database', status: 'Done', priority: 'Medium' },
  { id: 'TASK-10', epicId: 'EPIC-03', title: 'Implement seed data pipeline for blockbusters and metropolitan cinemas', category: 'Database', status: 'Done', priority: 'Low' },
  { id: 'TASK-11', epicId: 'EPIC-04', title: 'Integrate JWT token issuance and verify role-based middleware', category: 'Security', status: 'Done', priority: 'High' },
  { id: 'TASK-12', epicId: 'EPIC-04', title: 'Implement SkillWallet token ledger & Skill Credits balance checks', category: 'Security', status: 'Done', priority: 'High' },
  { id: 'TASK-13', epicId: 'EPIC-04', title: 'Create Admin vs Customer session switching for easy demo evaluation', category: 'Security', status: 'Done', priority: 'Medium' },
  { id: 'TASK-14', epicId: 'EPIC-05', title: 'Build BookMyShow-style Dark Cinematic Discovery Homepage with Hero Slider', category: 'Frontend', status: 'Done', priority: 'High' },
  { id: 'TASK-15', epicId: 'EPIC-05', title: 'Create Interactive Tiered Seat Selection Canvas with Curved Screen', category: 'Frontend', status: 'Done', priority: 'High' },
  { id: 'TASK-16', epicId: 'EPIC-05', title: 'Develop Gourmet Cinema F&B add-ons and Combos selection modal', category: 'Frontend', status: 'Done', priority: 'Medium' },
  { id: 'TASK-17', epicId: 'EPIC-05', title: 'Build Checkout, Multi-payment (UPI, Card, Skill Credits) and M-Ticket generator', category: 'Frontend', status: 'Done', priority: 'High' },
  { id: 'TASK-18', epicId: 'EPIC-06', title: 'Design Cinema Partner / Admin Hub for real-time theatre & movie management', category: 'DevOps', status: 'Done', priority: 'High' },
  { id: 'TASK-19', epicId: 'EPIC-06', title: 'Implement Booking cancellation with live seat reinstatement to cinema inventory', category: 'Frontend', status: 'Done', priority: 'High' }
];
