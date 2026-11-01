import {create} from "zustand";

export const useToastStore = create((set) => ({
    toast: null,

    addToast: (title, type, duration) => {
        const id = crypto.randomUUID();

        set(() => ({
            toast: { id, title, type, duration },
        }));
    },

    removeToast: () => set({toast: null})
}));