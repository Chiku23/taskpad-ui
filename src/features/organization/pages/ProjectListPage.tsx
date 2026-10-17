import { IoIosMore } from "react-icons/io";
import { useModalStore } from "../../../stores/useModalStore";
import { Link, useParams } from "react-router-dom";
import {PROJECTS} from "../../../seed/project.ts";
export const ProjectListPage = () => {
    const {openModal} = useModalStore();

    //filterout project belongs to selected organization
    const {orgId} = useParams();
    const filteredProjects = PROJECTS.filter((project) => project.organizationId === orgId);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button 
        className="border border-app-border px-4 py-2 rounded-md bg-app-button cursor-pointer text-black font-semibold"
        onClick={() => openModal("create_project")}
        >
          Create New
        </button>
      </div>

      <div className="border rounded-lg border-app-border">
        <table className="w-full text-left">
          <thead>
            <tr className="text-text-muted text-sm border-b border-app-border bg-app-card">
              <th className="p-2">Project Name</th>
              <th className="p-2">Project Lead</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
              <th className="p-2">Due date</th>
              <th className="p-2">Setting</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects && (filteredProjects.map((project) => (
              <tr
                key={project.id}
                className="text-text-muted text-sm border-b border-app-border"
              >
                <td className="p-2 text-blue-500 hover:underline cursor-pointer">
                  <Link to={`/projects/${project.id}`}>
                  {project.name}
                  </Link>
                </td>
                <td className="p-2">{project.lead}</td>
                <td className="p-2 text-xs">
                  <select 
                  name="status" 
                  className="border border-app-border rounded-md px-2 py-1 outline-none cursor-pointer"
                  defaultValue={project.status}>
                    <option value="In-progress">In Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="p-2">{project.created}</td>
                <td className="p-2">{project.due}</td>
                <td className="p-2">
                    <button className="flex items-center cursor-pointer">
                     <IoIosMore className="size-5"/>
                    </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
