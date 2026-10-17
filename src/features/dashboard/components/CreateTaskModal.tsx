import React from "react";
import { PROJECTS } from "../../../seed/project.ts";

interface CreateProjectModalProps {
  onSuccess: () => void;
}

export const CreateTaskModal = ({ onSuccess }: CreateProjectModalProps) => {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSuccess();
  };
  return (
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
        <select
          id="project-name"
          name="project"
          defaultValue=""
          className="text-text-ghost text-sm border border-app-border bg-app-input-bg px-3 py-2 rounded-lg font-semibold w-full outline-none"
        >
          <option value="" disabled hidden>
            Select
          </option>
          {PROJECTS.map((project) => (
            <option value={project.name}>{project.name}</option>
          ))}
        </select>
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
  );
};
