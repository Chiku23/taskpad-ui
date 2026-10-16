import {create} from "zustand";

type ModalType = "create_project" | "create_task" | "create_organization";
interface ModalState{
    activeModal: ModalType | null;
    modalData: any; //stores project data
    openModal: (modalType: ModalType, data?:any) => void;
    closeModal:  () => void;
}
export const useModalStore = create<ModalState>((set) => ({
    activeModal: null,
    modalData: null,
    openModal: (modalType, data = null) => set({activeModal: modalType, modalData: data}),
    closeModal: () => set({activeModal: null, modalData: null})
}))