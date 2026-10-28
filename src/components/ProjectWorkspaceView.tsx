import React, { useState } from 'react';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Layers,
  Database,
  Server,
  Code2,
  ShieldCheck,
  ExternalLink,
  Github,
  Award,
  Sparkles,
  Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProjectWorkspaceView: React.FC = () => {
  const { epics, tasks, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'KANBAN' | 'ARCHITECTURE' | 'REQUIREMENTS'>('KANBAN');
  const [demoLink, setDemoLink] = useState('https://imovies-booking-applet.web.app');
  const [githubLink, setGithubLink] = useState('https://github.com/skillwallet/imovies-mern-platform');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    showToast('Demo and GitHub links submitted to your mentor for evaluation!', 'success');
    setTimeout(() => setIsSaved(false), 3000);
  };

  const columns = [
    { key: 'Backlog', title: 'To Do / Backlog', color: 'border-neutral-700' },
    { key: 'In Progress', title: 'In Progress', color: 'border-amber-500' },
    { key: 'Review', title: 'Review & QA', color: 'border-cyan-500' },
    { key: 'Done', title: 'Done (Completed)', color: 'border-emerald-500' }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header with Project Stats */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                <span className="font-semibold text-rose-400">SkillWallet Program</span>
                <span>·</span>
                <span>Full Stack Development (MERN Stack)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
                IMovies — Movie Ticket Booking Made Simple
              </h1>
              <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                A production-grade cinema management system that enables users to browse movies, explore showtimes, select seats in real-time, and process transactions seamlessly.
              </p>
            </div>

            {/* Overall progress indicator */}
            <div className="flex items-center gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-850 shrink-0">
              <div className="text-center">
                <span className="text-[10px] uppercase text-neutral-500 block">Total Epics</span>
                <span className="text-xl font-bold font-mono text-white">6 / 6</span>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div className="text-center">
                <span className="text-[10px] uppercase text-neutral-500 block">Total Tasks</span>
                <span className="text-xl font-bold font-mono text-emerald-400">19 / 19</span>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div className="text-center">
                <span className="text-[10px] uppercase text-neutral-500 block">Progress</span>
                <span className="text-xl font-bold font-mono text-rose-400">100%</span>
              </div>
            </div>
          </div>

          {/* Submission Banner for Mentor Evaluation */}
          <form onSubmit={handleSaveLinks} className="pt-4 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-2 w-full">
              <div className="flex-1 w-full">
                <input
                  type="url"
                  value={demoLink}
                  onChange={(e) => setDemoLink(e.target.value)}
                  placeholder="Live Demo URL"
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
              <div className="flex-1 w-full">
                <input
                  type="url"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  placeholder="GitHub Repository URL"
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md shadow-rose-950/40"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Submitted!' : 'Submit Links to Mentor'}</span>
            </button>
          </form>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-neutral-850 pb-2">
          {(['KANBAN', 'ARCHITECTURE', 'REQUIREMENTS'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-neutral-100 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab === 'KANBAN' && 'Kanban Board (19 Tasks)'}
              {tab === 'ARCHITECTURE' && 'MERN Architecture & MongoDB Schemas'}
              {tab === 'REQUIREMENTS' && 'System Requirements Specification'}
            </button>
          ))}
        </div>

        {/* TAB 1: KANBAN BOARD */}
        {activeTab === 'KANBAN' && (
          <div className="space-y-6">
            {/* Epics List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {epics.map((epic) => (
                <div key={epic.id} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-amber-400">{epic.id}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {epic.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{epic.title}</h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {epic.description}
                  </p>
                  <div className="w-full h-1 bg-neutral-950 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${epic.progressPercent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Task Column */}
            <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Sprint Execution Tasks (19 Stories Completed)
                </h3>
                <span className="text-xs font-mono text-emerald-400">100% Passing</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-2 hover:border-neutral-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono mb-1">
                        <span>{task.id} · {task.epicId}</span>
                        <span className="text-emerald-400 font-semibold">{task.category}</span>
                      </div>
                      <p className="text-xs font-medium text-neutral-200 leading-snug">
                        {task.title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-850 text-[10px]">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                      <span className="text-neutral-500">
                        Priority: {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARCHITECTURE & SCHEMAS */}
        {activeTab === 'ARCHITECTURE' && (
          <div className="space-y-6 text-xs">
            {/* MongoDB Schemas */}
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  MongoDB Database Collections Design
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: 'Users', desc: 'User ID, name, email, password (bcrypt), role, skillCredits (300), JWT session' },
                  { name: 'Movies', desc: 'Title, synopsis, poster, hero banner, duration, genres, formats, certificate, rating' },
                  { name: 'Theatres', desc: 'Name, chain (PVR, Cinépolis), city, address, facilities, screen configurations' },
                  { name: 'Shows', desc: 'Movie ref, theatre ref, audi, date, showtime, pricing tiers, sound format' },
                  { name: 'Seats', desc: 'Auditorium seat map (112 seats per hall), tier (Platinum/Gold/Silver), status' },
                  { name: 'Bookings', desc: 'Booking code, user ref, show ref, seat IDs, F&B snacks, QR entry pass, status' },
                  { name: 'Payments', desc: 'Transaction ID, amount, method (Skill Credits, UPI, Card), gateway receipt' },
                  { name: 'Notifications', desc: 'Booking SMS/Email dispatch logs, show reminder alerts, refund status' }
                ].map((col) => (
                  <div key={col.name} className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-850 space-y-1">
                    <span className="font-bold text-amber-300 font-mono text-sm block">
                      db.{col.name}
                    </span>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {col.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* REST API Endpoints */}
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Express.js RESTful API Endpoints
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850">
                  <span className="text-emerald-400 font-bold">GET</span> /api/movies?city=:city&genre=:g
                  <p className="text-[10px] text-neutral-400 font-sans mt-0.5">Filter movies currently screening</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850">
                  <span className="text-emerald-400 font-bold">GET</span> /api/shows?movieId=:id&date=:d
                  <p className="text-[10px] text-neutral-400 font-sans mt-0.5">Query multiplex showtimes and seat fullness</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850">
                  <span className="text-cyan-400 font-bold">POST</span> /api/bookings/lock-seats
                  <p className="text-[10px] text-neutral-400 font-sans mt-0.5">Lock selected seats in real-time</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850">
                  <span className="text-cyan-400 font-bold">POST</span> /api/bookings/confirm
                  <p className="text-[10px] text-neutral-400 font-sans mt-0.5">Verify JWT, deduct credits, issue M-Ticket</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850">
                  <span className="text-rose-400 font-bold">POST</span> /api/bookings/:id/cancel
                  <p className="text-[10px] text-neutral-400 font-sans mt-0.5">Cancel booking, release seats, refund credits</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850">
                  <span className="text-amber-400 font-bold">GET</span> /api/admin/analytics
                  <p className="text-[10px] text-neutral-400 font-sans mt-0.5">Box office revenue and auditorium occupancy</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REQUIREMENTS SPEC */}
        {activeTab === 'REQUIREMENTS' && (
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              System Requirements & Functional Outcomes
            </h3>
            
            <div className="space-y-3 text-neutral-300 leading-relaxed">
              <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-850">
                <h4 className="font-bold text-white mb-1">1. Environment & Architectural Stack</h4>
                <p className="text-neutral-400">
                  Node.js (v18+), Express.js backend server with CORS & dotenv, React 19 frontend with Tailwind CSS, TypeScript, and MongoDB storage architecture.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-850">
                <h4 className="font-bold text-white mb-1">2. Role-Based Security & JWT</h4>
                <p className="text-neutral-400">
                  JWT authentication with user/admin role separation. Customer profile (SJ - Sarah Jenkins) with 300 Skill Credits balance; Partner Admin dashboard for cinema management.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-850">
                <h4 className="font-bold text-white mb-1">3. Real-Time Seat Availability</h4>
                <p className="text-neutral-400">
                  Interactive curved screen cinema hall with Platinum, Gold, and Silver tiers. Real-time occupancy locking prevents double booking and reflects newly confirmed or cancelled seats instantly.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-850">
                <h4 className="font-bold text-white mb-1">4. Payment & Cancellation with Refund</h4>
                <p className="text-neutral-400">
                  Seamless payment flow via Skill Credits, UPI, and Card. Includes digital M-Ticket QR generation and a one-click cancellation workflow with automatic credit refunds.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
