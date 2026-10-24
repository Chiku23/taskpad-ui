import {create} from "zustand";
type ModalType = "create_project" | "create_task" | "create_organization" | "add_org_member";
interface ModalState{
    activeModal: ModalType | null;
    modalData: unknown; //stores project data
    openModal: (modalType: ModalType, data?: unknown) => void;
    closeModal:  () => void;
}
export const useModalStore = create<ModalState>((set) => ({
    activeModal: null,
    modalData: null,
    openModal: (modalType, data = null) => set({activeModal: modalType, modalData: data}),
    closeModal: () => set({activeModal: null, modalData: null})
}))