import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-2xl flex items-start gap-2.5 backdrop-blur-md transition-all animate-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'bg-neutral-900/95 border-emerald-800/80 text-neutral-100 shadow-emerald-950/30'
                : isWarning
                ? 'bg-neutral-900/95 border-amber-800/80 text-neutral-100 shadow-amber-950/30'
                : isError
                ? 'bg-neutral-900/95 border-rose-800/80 text-neutral-100 shadow-rose-950/30'
                : 'bg-neutral-900/95 border-neutral-750 text-neutral-100'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {isWarning && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {!isSuccess && !isWarning && !isError && <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}

            <div className="flex-1 text-xs leading-snug">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white p-0.5 shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
