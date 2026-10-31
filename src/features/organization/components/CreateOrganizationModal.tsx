import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrganization } from "../hooks/useCreateOrganization";
import { generateSlug } from "../../../utils/generateSlug";
import { useOrgStore } from "../../../stores/useOrgStore";

interface CreateOrganizationModalProps {
  onSuccess: () => void;
}

export const CreateOrganizationModal = ({ onSuccess }: CreateOrganizationModalProps) => {
  const [orgName, setOrgName] = useState("");
  const orgSlugName = generateSlug(orgName);
  const navigate = useNavigate();

  const { mutateCreateOrganization, isPending } = useCreateOrganization();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutateCreateOrganization(
      { name: orgName, slug: orgSlugName },
      {
        onSuccess: (response: any) => {
          onSuccess();
          const createdOrg = response?.data?.organization;
          if (createdOrg) {
            useOrgStore.getState().setActiveOrg(createdOrg);
            localStorage.setItem("active_org_slug", createdOrg.slug);
          } else {
            localStorage.setItem("active_org_slug", orgSlugName);
          }
          navigate(`/${orgSlugName}/dashboard`, { replace: true });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Form Fields */}
      <div className="flex flex-col gap-1">
        <label htmlFor="org-name" className="text-xs font-bold text-text-ghost uppercase tracking-wide">
          Organization Name
        </label>
        <input
          id="org-name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none"
          type="text"
          placeholder="e.g. Zeta pvt. ltd."
          required
        />
      </div>
      <button 
        type="submit"
        disabled={isPending} 
        className="mt-6 w-full bg-app-button hover:bg-app-button-hover text-black font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? "Creating…" : "Create Organization"}
      </button>
    </form>
  );
};
