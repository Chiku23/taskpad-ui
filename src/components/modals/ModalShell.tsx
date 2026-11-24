import React, { useEffect, useId } from "react";
import { Icon } from "../ui/Icon";

interface ModalShellProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  modalShellClassName?: string;
}

export const ModalShell = ({
  title,
  onClose,
  children,
  modalShellClassName = "w-full max-w-md",
}: ModalShellProps) => {
  const titleId = useId();

  // Close on Escape & lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`w-full bg-app-card border border-app-border rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${modalShellClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-app-border flex items-center justify-between bg-app-background shrink-0">
          <h2 id={titleId} className="text-base font-bold text-text-main">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-app-item-hover text-text-ghost hover:text-text-muted cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
