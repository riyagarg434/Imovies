import React, { useState } from 'react';
import {
  Wallet,
  CreditCard,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Plus,
  RefreshCw,
  Coins,
  KeyRound,
  CheckCircle2,
  Ticket
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillWalletView: React.FC = () => {
  const { user, addSkillCredits, bookings, setActiveView } = useApp();
  const [topUpAmount, setTopUpAmount] = useState<number>(250);
  const [isAdding, setIsAdding] = useState(false);

  const handleTopUp = () => {
    setIsAdding(true);
    setTimeout(() => {
      addSkillCredits(topUpAmount);
      setIsAdding(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-850 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-bold text-neutral-950 text-xs">
                SW
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white font-display">
                SkillWallet & Credits Hub
              </h1>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Integrated rewards, JWT authenticated token balance, and cinema payment passes
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono">
              Role: <strong className="text-amber-400">{user.role.toUpperCase()}</strong>
            </span>
          </div>
        </div>

        {/* Top Cards: Skill Card Hologram & Balances */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Virtual Skill Card (Holographic Dark luxury look) */}
          <div className="md:col-span-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 p-6 border border-neutral-800 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[220px]">
            {/* Ambient pattern */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/10 via-rose-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-amber-400 text-neutral-950 flex items-center justify-center font-extrabold text-xs">
                  SW
                </div>
                <span className="text-sm font-bold tracking-wider text-white font-display">
                  SKILL CARD
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
                Platinum Member
              </span>
            </div>

            <div className="space-y-1 my-4">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                Total Available Credits
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
                  {user.skillCredits}
                </span>
                <span className="text-amber-400 font-medium text-sm">Skill Credits</span>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-neutral-800/80 pt-3 text-xs">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Card Holder</span>
                <span className="font-semibold text-neutral-200">{user.name}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-500 block uppercase">JWT Status</span>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1 justify-end">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats: Token Balances & Fast Top-up */}
          <div className="md:col-span-6 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-850">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>AI Tokens</span>
                </div>
                <div className="text-xl font-bold font-mono text-white">
                  {user.aiTokens} <span className="text-xs text-neutral-500 font-normal">Tokens</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-850">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  <span>Auth Session</span>
                </div>
                <div className="text-xs font-mono text-emerald-400 truncate">
                  JWT active (24h)
                </div>
              </div>
            </div>

            {/* Top Up Section */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-3">
              <span className="text-xs font-semibold text-neutral-200 block">
                Quick Top-Up Skill Credits
              </span>
              <div className="flex items-center gap-2">
                {[100, 250, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTopUpAmount(amt)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                      topUpAmount === amt
                        ? 'bg-rose-600 text-white font-bold'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    +{amt}
                  </button>
                ))}
              </div>

              <button
                onClick={handleTopUp}
                disabled={isAdding}
                className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                {isAdding ? 'Adding Credits...' : `Add +${topUpAmount} Credits to SkillWallet`}
              </button>
            </div>

          </div>

        </div>

        {/* Benefits breakdown */}
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
            SkillWallet Cinema Privileges
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850 space-y-1">
              <span className="font-semibold text-neutral-200 block">Zero Convenience Fees</span>
              <p className="text-neutral-400 text-[11px]">
                Enjoy 100% waiver on booking fees when redeeming Skill Credits.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850 space-y-1">
              <span className="font-semibold text-neutral-200 block">Instant Ticket Refunds</span>
              <p className="text-neutral-400 text-[11px]">
                Cancelled show tickets are refunded directly to your SkillWallet in seconds.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850 space-y-1">
              <span className="font-semibold text-neutral-200 block">VIP Multiplex Entry</span>
              <p className="text-neutral-400 text-[11px]">
                Show your digital Skill Card at PVR INOX & Cinépolis for lounge access.
              </p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Credits Activity
            </h3>
            <span className="text-xs text-neutral-400">
              Live Ledger
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Initial Welcome Bonus */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-200">SkillWallet Welcome Bonus</p>
                  <p className="text-[11px] text-neutral-500">MERN Project Onboarding Allotment</p>
                </div>
              </div>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                +300 Credits
              </span>
            </div>

            {/* Any ticket bookings redeemed with credits */}
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    b.status === 'CONFIRMED'
                      ? 'bg-rose-500/10 text-rose-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {b.status === 'CONFIRMED' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-200">
                      {b.status === 'CONFIRMED' ? 'Ticket Redemption' : 'Booking Cancellation Refund'}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      {b.movieTitle} · {b.bookingCode}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono font-bold text-sm ${
                    b.status === 'CONFIRMED' ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {b.status === 'CONFIRMED' ? `-${b.creditsUsed || b.totalAmount}` : `+${b.creditsUsed || Math.floor(b.totalAmount * 0.9)}`} Credits
                  </span>
                  <span className="text-[10px] text-neutral-500 block">
                    {b.bookedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
