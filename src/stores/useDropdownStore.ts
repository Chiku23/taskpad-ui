import {create} from "zustand";

interface DropdownState {
    activeDropdownId: string | null;
    openDropdown: (id: string) => void;
    closeDropdown: () => void;
    toggleDropdown: (id: string) => void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
    activeDropdownId: null,
    openDropdown: (id) => set({activeDropdownId: id}),
    closeDropdown: () => set({activeDropdownId: null}),
    toggleDropdown: (id) => set((state) => ({activeDropdownId: state.activeDropdownId === id ? null : id}))
}))