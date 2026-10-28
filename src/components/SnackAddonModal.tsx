import React, { useState } from 'react';
import { X, Plus, Minus, UtensilsCrossed, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SnackItem } from '../types';

interface SnackAddonModalProps {
  onProceed: () => void;
  onClose: () => void;
}

export const SnackAddonModal: React.FC<SnackAddonModalProps> = ({ onProceed, onClose }) => {
  const { snacks, selectedSnacks, updateSnackQuantity } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Popcorn', 'Snacks', 'Beverages', 'Combos'];

  const filteredSnacks = activeCategory === 'All'
    ? snacks
    : snacks.filter((s) => s.category === activeCategory);

  const totalSnackAmount = selectedSnacks.reduce(
    (sum, s) => sum + s.item.price * s.quantity,
    0
  );

  const totalItemsCount = selectedSnacks.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Grab Cinema Bites & Combos
              </h3>
              <p className="text-xs text-neutral-400">
                Freshly prepared and delivered straight to your seat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-neutral-950/60 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSnacks.map((snack) => {
              const selected = selectedSnacks.find((s) => s.item.id === snack.id);
              const qty = selected ? selected.quantity : 0;

              return (
                <div
                  key={snack.id}
                  className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex gap-3 hover:border-neutral-700 transition-colors"
                >
                  {/* Food Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-900 shrink-0">
                    <img
                      src={snack.imageUrl}
                      alt={snack.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Food Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {snack.name}
                        </h4>
                        {snack.isVeg && (
                          <span className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5 leading-snug">
                        {snack.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold font-mono text-emerald-400">
                        ₹{snack.price}
                      </span>

                      {/* Quantity Controller */}
                      {qty > 0 ? (
                        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => updateSnackQuantity(snack, -1)}
                            className="p-0.5 text-neutral-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold font-mono text-white min-w-[14px] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateSnackQuantity(snack, 1)}
                            className="p-0.5 text-neutral-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateSnackQuantity(snack, 1)}
                          className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-neutral-200 transition-colors cursor-pointer"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-400">
              {totalItemsCount > 0 ? (
                <span>
                  {totalItemsCount} item{totalItemsCount > 1 ? 's' : ''} added: <strong className="text-white font-mono">₹{totalSnackAmount}</strong>
                </span>
              ) : (
                <span>No snacks selected</span>
              )}
            </div>
            <div className="text-[11px] text-neutral-500">
              Delivered directly to your cinema seat
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onProceed}
              className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Skip
            </button>
            <button
              onClick={onProceed}
              className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-950 transition-colors cursor-pointer"
            >
              Continue to Payment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
