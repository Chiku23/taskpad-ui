import { create } from "zustand";
import type { Organization } from "../features/organization/types/organizationTypes";

interface OrgState {
  activeOrg: Organization | null;
  setActiveOrg: (org: Organization) => void;
  clearActiveOrg: () => void;
}

export const useOrgStore = create<OrgState>((set) => ({
  activeOrg: null,
  setActiveOrg: (org) => set({ activeOrg: org }),
  clearActiveOrg: () => set({ activeOrg: null }),
}));
