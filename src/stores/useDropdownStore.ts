import {create} from "zustand";

interface DropdownState {
    activeDropdownId: number | string | null;
    openDropdown: (id: string | number) => void;
    closeDropdown: () => void;
    toggleDropdown: (id: string | number) => void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
    activeDropdownId: null,
    openDropdown: (id) => set({activeDropdownId: id}),
    closeDropdown: () => set({activeDropdownId: null}),
    toggleDropdown: (id) => set((state) => ({activeDropdownId: state.activeDropdownId === id ? null : id}))
}))