import type React from "react";

interface CreateProjectModalProps {
    onSuccess: () => void;
}
export const CreateProjectModal = ({onSuccess}: CreateProjectModalProps) => {

    const handleSubmit = (e: React.SubmitEvent) => {
      e.preventDefault();
      onSuccess();
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Form Fields */}
      <div className="flex flex-col gap-1">
        <label htmlFor="project-name" className="text-xs font-bold text-text-ghost uppercase tracking-wide">
          Project Name
        </label>
        <input
          id="project-name"
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none"
          type="text"
          placeholder="e.g. Zeta pvt. ltd."
          required
        />
        <label htmlFor="project-lead" className="text-xs font-bold text-text-ghost uppercase tracking-wide">
          Project Leader
        </label>
        <input
          id="project-lead"
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none"
          type="text"
          placeholder="e.g Priyabrat sahu"
          required
        />
      </div>

      <button 
        type="submit" 
        className="mt-6 w-full bg-app-button hover:bg-app-button-hover text-black font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer"
      >
        Add Project
      </button>
    </form>
  );
};
