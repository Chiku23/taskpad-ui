import {create} from "zustand";

type ToastType = "success" | "error" | "warning";
export interface Toast {
    id: string;
    title: string;
    type: ToastType;
    duration: number;
}

interface ToastStore {
    toasts: Toast[];
    addToast: (title: string, type: ToastType, duration: number) => void;
    removeToast: (id: string) => void;
}
export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],

    addToast: (title, type, duration) => {
        const id = crypto.randomUUID();

        set((state) => ({
            toasts: [...state.toasts, {id, title, type, duration}],
        }));
    },

    removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
}));