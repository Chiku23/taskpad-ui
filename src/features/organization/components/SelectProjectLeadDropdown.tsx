import { Dropdown } from "../../../components/ui/Dropdown";
import { useGetProjectMembers } from "../../projects/hooks/useGetProjectMembers";

interface SelectProjectLeadDropdownProps {
  id: number | string;
  projectSlug: string;
  selected: number | null;
  onSelectUser: (id: number) => void;
}

export const SelectProjectLeadDropdown = ({ id, projectSlug, onSelectUser, selected }: SelectProjectLeadDropdownProps) => {
    const {projectMembersData} = useGetProjectMembers(projectSlug);
    const members = projectMembersData?.data?.members || [];
    const selectedMember = members.find((member) => member.user_id === selected);
  return (
    <Dropdown
      id={id}
      dropdownClassName="absolute left-0 top-full w-full z-50"
      triggerClassName="w-full h-full text-left cursor-pointer flex items-center" 
      trigger={
        <div className="p-2">
            {selectedMember ? selectedMember.user_id : "Unassigned"}
        </div>
      }
    >
      <div className="w-full mt-0.5 rounded-sm flex flex-col bg-app-card border border-app-border">
        {members.map((member) => (
            <button 
            key={member.id}
            className="p-2 text-left"
            onClick={() => onSelectUser(member.user_id)}>
                <span>{member.user_id}</span>
            </button>
        ))}
      </div>
    </Dropdown>
  );
};
