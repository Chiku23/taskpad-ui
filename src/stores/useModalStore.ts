import {create} from "zustand";
import type { Organization } from "../features/organization/types/organizationTypes";
import type { Project } from "../features/projects/types/projectTypes";

type ModalCombo =
  | { activeModal: "create_organization"; modalData: Organization | null }
  | { activeModal: "create_project"; modalData: Project | null }
  | { activeModal: "create_task"; modalData: unknown }
  | { activeModal: "add_org_member"; modalData: Organization } 
  | { activeModal: null; modalData: null }; 
interface ModalState{
    activeModal: ModalCombo["activeModal"];
    modalData: ModalCombo["modalData"]; //stores project data
    openModal: (modal: ModalCombo) => void;
    closeModal:  () => void;
}
export const useModalStore = create<ModalState>((set) => ({
    activeModal: null,
    modalData: null,

    openModal: (modal) => set({
        activeModal: modal.activeModal, 
        modalData: modal.modalData
    }),

    closeModal: () => set({activeModal: null, modalData: null})
}))