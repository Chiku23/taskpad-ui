import { useDropdownStore } from "../../stores/useDropdownStore";
import React, { useEffect, useRef } from "react";

interface DropdownProps {
  id: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}
export const Dropdown = ({ id, trigger, children }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const acticeDropdownId = useDropdownStore((state) => state.activeDropdownId);
  const closeDropdown = useDropdownStore((state) => state.closeDropdown);
  const toggleDropdown = useDropdownStore((state) => state.toggleDropdown);

  const isOpen = acticeDropdownId === id;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeDropdown]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Fires layout state update in Zustand store */}
      <button 
      type="button"
      onClick={(e) => {
        toggleDropdown(id);
        if (isOpen) {
          e.currentTarget.blur();
        }
      }} 
      className="cursor-pointer focus:ring rounded-md">
        {trigger}
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-1 w-64 border border-app-border bg-app-sidebar rounded-md shadow-lg py-2 text-sm text-text-muted"
          onClick={closeDropdown} // Closes state globally when any interior selection is clicked
        >
          {children}
        </div>
      )}
    </div>
  );
};
