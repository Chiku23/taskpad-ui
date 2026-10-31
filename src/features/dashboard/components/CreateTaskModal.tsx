import React, { useState } from "react";
import type { Project } from "../../projects/types/projectTypes.ts";
import { Dropdown } from "../../../components/ui/Dropdown.tsx";
import { IoReloadOutline } from "react-icons/io5";

interface CreateProjectModalProps {
  onSuccess: () => void;
  projectData: Project[];
  isLoading: boolean;
}

export const CreateTaskModal = ({
  onSuccess,
  projectData,
  isLoading,
}: CreateProjectModalProps) => {
  const [selectedProject, setSelectedProject] = useState("");
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSuccess();
  };
  return (
    <div>
      {isLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
          <IoReloadOutline className="size-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium text-text-ghost">
            Loading...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Form Fields */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="task-title"
              className="text-xs font-bold text-text-ghost uppercase tracking-wide"
            >
              Task title
            </label>
            <input
              id="task-title"
              className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none"
              type="text"
              placeholder="e.g. Fix loading state in Login"
              required
            />
            <label
              htmlFor="project-name"
              className="text-xs font-bold text-text-ghost uppercase tracking-wide"
            >
              Project
            </label>
            <SelectProjectDropdown
              id="project-name"
              projects={projectData}
              selectedProject={selectedProject}
              onSelect={setSelectedProject}
            />
            <label
              htmlFor="description"
              className="text-xs font-bold text-text-ghost uppercase tracking-wide"
            >
              Description
            </label>
            <textarea
              id="description"
              className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 h-30 rounded-lg font-semibold w-full outline-none"
              placeholder="Add description"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-app-button hover:bg-app-button-hover text-black font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer"
          >
            Add new task
          </button>
        </form>
      )}
    </div>
  );
};

interface SelectProjectDropdownProps {
  id: string;
  projects: Project[];
  selectedProject: string;
  onSelect: (projectId: string) => void;
}

const SelectProjectDropdown = ({
  id,
  projects,
  selectedProject,
  onSelect,
}: SelectProjectDropdownProps) => {
  return (
    <Dropdown
      id={id}
      dropdownClassName="w-full"
      triggerClassName="w-full text-left cursor-pointer rounded-md outline-none"
      trigger={
        <div className="text-sm font-semibold border border-app-border bg-app-input-bg px-4 py-2 rounded-lg cursor-pointer w-full">
          {selectedProject || "Select a project..."}
        </div>
      }
    >
      <div className="flex flex-col p-2 bg-app-input-bg border border-app-border rounded-lg">
        {projects?.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project.name)}
            className="text-left text-sm py-1 px-2 hover:bg-app-border cursor-pointer rounded"
          >
            {project.name}
          </button>
        ))}
      </div>
    </Dropdown>
  );
};
