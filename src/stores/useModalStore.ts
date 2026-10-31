import { create } from "zustand";
import type { Organization } from "../features/organization/types/organizationTypes";
import type { Project } from "../features/projects/types/projectTypes";

export type ModalType =
  | "create_organization"
  | "create_project"
  | "edit_project"
  | "create_task"
  | "add_org_member";

export type ModalCombo =
  | { activeModal: "create_organization"; modalData?: Organization | null }
  | { activeModal: "create_project"; modalData?: Project | null }
  | { activeModal: "edit_project"; modalData?: Project | null }
  | { activeModal: "create_task"; modalData?: { projects: Project[]; isLoading: boolean } | null }
  | { activeModal: "add_org_member"; modalData: Organization }
  | { activeModal: null; modalData: null };

export interface ModalState {
  activeModal: ModalType | null;
  modalData: any;
  openModal: {
    (modal: ModalCombo): void;
    (modalType: ModalType, modalData?: any): void;
  };
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: null,

  openModal: (modalOrType: any, data?: any) => {
    if (typeof modalOrType === "string") {
      set({
        activeModal: modalOrType as ModalType,
        modalData: data ?? null,
      });
    } else if (modalOrType && typeof modalOrType === "object") {
      set({
        activeModal: modalOrType.activeModal,
        modalData: modalOrType.modalData ?? null,
      });
    }
  },

  closeModal: () => set({ activeModal: null, modalData: null }),
}));
