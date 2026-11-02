import { Dropdown } from "../../../components/ui/Dropdown";
import { IoEllipsisHorizontal, IoPersonOutline, IoTrash, IoSettingsOutline  } from "react-icons/io5";
import { useModalStore } from "../../../stores/useModalStore";
import type { Project } from "../../projects/types/projectTypes";

interface ProjectSettingDropdownProps {
  id: number;
  project: Project
}


export const ProjectSettingDropdown = ({ id, project }: ProjectSettingDropdownProps) => {
  const {openModal} = useModalStore();
   const openEditProject = (e: React.MouseEvent, project: Project) => {
      e.preventDefault();
      e.stopPropagation();
      openModal("edit_project", project);
    };
  return (
    <Dropdown
      id={id}
      dropdownClassName="z-10 w-50 right-0 mt-1 border border-app-border rounded-sm bg-app-input-bg text-left"
      trigger={
        <div>
          <IoEllipsisHorizontal />
        </div>
      }
      triggerClassName="border border-transparent hover:border p-1 rounded-md hover:border-app-border cursor-pointer"
    >
      <ul className="flex flex-col gap-0.5">
        <li>
          <button 
          onClick={() => openModal("add_project_member", project)}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer">
            <IoPersonOutline />
            Add Member
          </button>
        </li>
        <li>
          <button 
          onClick={(e) => openEditProject(e, project)}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer">
            <IoSettingsOutline />
            Edit Project
          </button>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer text-priority-highest">
          <IoTrash />
          Delete project
        </li>
      </ul>
    </Dropdown>
  );
};
