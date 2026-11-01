import { useState } from "react";
import { useParams } from "react-router-dom";
import { Dropdown } from "../../../components/ui/Dropdown";
import { useGetOrganizationMembers } from "../hooks/useGetOrganizationMembers";

interface SelectProjectMemberDropdownProps {
  id: number | string;
  onSelectUser: (id: number) => void;
}

export const SelectProjectMemberDropdown = ({ id, onSelectUser }: SelectProjectMemberDropdownProps) => {
  const [projectMember, setProjectMember] = useState("Unassigned");
  const { orgSlug } = useParams();
  const { organizationMembersData } = useGetOrganizationMembers(orgSlug || "");
  const members = organizationMembersData?.data?.members || [];

  const handleUserSelection = (member) => {
    setProjectMember(member.user_email)
    onSelectUser(member.id)
  }

  return (
    <Dropdown
      id={id}
      dropdownClassName="absolute left-0 top-full w-full z-50"
      triggerClassName="w-full h-full text-left cursor-pointer flex items-center" 
      trigger={
        <div className="p-2">
            {projectMember || "Unassigned"}
        </div>
      }
    >
      <div className="w-full mt-0.5 rounded-sm flex flex-col bg-app-card border border-app-border">
        {members.map((member) => (
            <button 
            key={member.id}
            className="p-2 text-left"
            onClick={() => handleUserSelection(member)}>
                <span>{member.user_email}</span>
            </button>
        ))}
      </div>
    </Dropdown>
  );
};
