import { create } from "zustand";
import type { Organization } from "../features/organization/types/organizationTypes";
import type { Project } from "../features/projects/types/projectTypes";

type ModalCombo =
  | { activeModal: "create_organization"; modalData: Organization | null }
  | { activeModal: "create_project"; modalData: Project | null }
  | { activeModal: "create_task"; modalData: { projects: Project[]; isLoading: boolean } }
  | { activeModal: "add_org_member"; modalData: Organization } 
  | { activeModal: null; modalData: null }; 

type ModalState = ModalCombo & {
    openModal: (modal: ModalCombo) => void;
    closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
    activeModal: null,
    modalData: null,

    openModal: (modal) => set({
        activeModal: modal.activeModal, 
        modalData: modal.modalData
    } as Partial<ModalState>),

    closeModal: () => set({ activeModal: null, modalData: null })
}));
