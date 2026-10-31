import { useDropdownStore } from "../../stores/useDropdownStore";
import React, { useEffect, useRef } from "react";

interface DropdownProps {
  id: number | string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  dropdownClassName: string;
  triggerClassName: string;
}
export const Dropdown = ({ id, trigger, children, dropdownClassName, triggerClassName }: DropdownProps) => {
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
    <div className="relative" ref={dropdownRef}>
      {/* Fires layout state update in Zustand store */}
      <button 
      id={String(id)}
      type="button"
      onClick={(e) => {
        toggleDropdown(id);
        if (isOpen) {
          e.currentTarget.blur();
        }
      }} 
      className={`${triggerClassName}`}>
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`absolute ${dropdownClassName}`}
          onClick={closeDropdown} // Closes state globally when any interior selection is clicked
        >
          {children}
        </div>
      )}
    </div>
  );
};
