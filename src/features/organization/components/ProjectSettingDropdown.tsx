import { Dropdown } from "../../../components/ui/Dropdown";
import { IoEllipsisHorizontal, IoPersonOutline, IoTrash } from "react-icons/io5";

interface ProjectSettingDropdownProps {
  id: number;
}
export const ProjectSettingDropdown = ({ id }: ProjectSettingDropdownProps) => {
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
          <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer">
            <IoPersonOutline />
            Add Member
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
