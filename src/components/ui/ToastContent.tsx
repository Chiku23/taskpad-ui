import { useEffect, useState } from "react";
import { useToastStore } from "../../stores/useToastStore";

// Type definition for context clarity (adjust based on your actual store)
interface ToastType {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration: number;
}

export const ToastContent = () => {
  const { toast, removeToast } = useToastStore() as { toast: ToastType | null; removeToast: () => void };
  const [shouldRender, setShouldRender] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!toast) {;
      return;
    }

    // Trigger exit animation right before removing
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, toast.duration - 300);

    // Final unmount and store cleanup
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      removeToast();
    }, toast.duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [toast, removeToast]);

  if (!toast || !shouldRender) return null;

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
      removeToast();
    }, 300);
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <div
        key={toast.id}
        className={`
          flex flex-col relative overflow-hidden pointer-events-auto min-w-[320px] max-w-sm rounded-xl border shadow-lg backdrop-blur-md 
          transition-all duration-300 transform
          ${isExiting 
            ? "animate-out fade-out slide-out-to-top-2 scale-95 opacity-0" 
            : "animate-in slide-in-from-top-4 fade-in duration-300"
          }
        `}
      >
        {/* Main Content Layout */}
        <div className="flex items-start gap-3 p-4">

          {/* Text Message */}
          <div className="flex-1 flex flex-col gap-0.5 text-sm">
            <span className="font-semibold tracking-wide">{toast.title}</span>
            {toast.description && (
              <span className="text-xs opacity-80 leading-relaxed">{toast.description}</span>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 p-1 rounded-lg opacity-40 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Timed Progress Bar */}
        <div className="w-full h-[3px] bg-black/5 dark:bg-white/10 absolute bottom-0 left-0 right-0">
          <div
            className={`h-full transition-all ease-linear`}
            style={{
              animation: `shrinkWidth ${toast.duration}ms linear forwards`,
            }}
          />
        </div>
      </div>

      {/* Global CSS Inject for the progress bar animation */}
      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};
