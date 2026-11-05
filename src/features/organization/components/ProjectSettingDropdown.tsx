import { Dropdown } from "../../../components/ui/Dropdown";
import { Icon } from "../../../components/ui/Icon";

import type { Project } from "../../projects/types/projectTypes";
import { useModalStore } from "../../../stores/useModalStore";

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
          <Icon name="ellipsis" size={16}/>
        </div>
      }
      triggerClassName="border border-transparent hover:border p-1 rounded-md hover:border-app-border cursor-pointer"
    >
      <ul className="flex flex-col gap-0.5">
        <li>
          <button 
          onClick={() => openModal("add_project_member", project)}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer">
            <Icon name="user" size={16}/>
            Add Member
          </button>
        </li>
        <li>
          <button 
          onClick={(e) => openEditProject(e, project)}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer">
            <Icon name="settings" size={16}/>
            Edit Project
          </button>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer text-priority-highest">
          <Icon name="delete" size={16}/>
          Delete project
        </li>
      </ul>
    </Dropdown>
  );
};
