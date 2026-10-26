import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalShellProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalShell = ({ title, onClose, children }: ModalShellProps) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xss"
      onClick={onClose} // Clicks on backdrop close the modal
    >
      <div 
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md bg-app-sidebar border border-app-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevents clicks inside the form from closing the modal
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-app-border flex items-center justify-between bg-app-background">
          <h2 className="text-base font-bold text-text-main">{title}</h2>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-app-item-hover text-text-ghost hover:text-text-muted cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <IoMdClose className="size-5" />
          </button>
        </div>

        {/* Modal Body Context Injection */}
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
