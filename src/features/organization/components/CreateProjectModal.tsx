import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { useCreateProject } from "../../projects/hooks/useCreateProject";

interface CreateProjectModalProps {
  onSuccess: () => void;
}
export const CreateProjectModal = ({ onSuccess }: CreateProjectModalProps) => {
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    description: "",
    lead: "",
    key: ""
  })
  const {orgSlug} = useParams<{orgSlug: string}>();
  const {mutateCreateProject} = useCreateProject();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    mutateCreateProject({
      slug: orgSlug || "",
      projectFormData: {
        ...projectFormData,
        lead: null,
      },
    }, {onSuccess});
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Form Fields */}
      <div className="flex flex-col gap-2">
        <div>
          <label
            htmlFor="project-name"
            className="text-xs font-bold text-text-ghost uppercase tracking-wide"
          >
            Project Name
          </label>
          <input
            id="project-name"
            value={projectFormData.name}
            onChange={(e) => setProjectFormData({...projectFormData, name: e.target.value})}
            className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg w-full outline-none"
            type="text"
            placeholder="e.g. Zeta pvt. ltd."
            required
          />
        </div>

        <div>
          <label
            htmlFor="project-description"
            className="text-xs font-bold text-text-ghost uppercase tracking-wide"
          >
            Description
          </label>
          <textarea
            id="project-description"
            value={projectFormData.description}
            onChange={(e) => setProjectFormData({...projectFormData, description: e.target.value})}
            className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 h-20 rounded-lg w-full outline-none"
            placeholder="Add a short description....."
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="project-lead"
            className="text-xs font-bold text-text-ghost uppercase tracking-wide"
          >
            Project Leader
          </label>
          <input
            id="project-lead"
            value={projectFormData.lead}
            onChange={(e) => setProjectFormData({...projectFormData, lead: e.target.value})}
            className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg w-full outline-none"
            type="text"
            placeholder="e.g Priyabrat sahu"
          />
        </div>
        <div>
          <label
            htmlFor="project-key"
            className="text-xs font-bold text-text-ghost uppercase tracking-wide"
          >
            Key
          </label>
          <input
            id="project-key"
            value={projectFormData.key.toUpperCase()}
            onChange={(e) => setProjectFormData({...projectFormData, key: e.target.value.toUpperCase()})}
            className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg w-full outline-none"
            type="text"
            placeholder="e.g WAPP"
            required
          />
        </div>
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
