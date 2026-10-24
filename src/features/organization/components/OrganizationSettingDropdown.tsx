import { Dropdown } from "../../../components/ui/Dropdown";
import { IoPersonOutline, IoSettingsOutline, IoTrash, IoEllipsisHorizontal } from "react-icons/io5";
import { useModalStore } from "../../../stores/useModalStore";
import { useOrganization } from "../hooks/useOrganization";
import { useParams } from "react-router-dom";
import { useGetOrganizationMembers } from "../hooks/useGetOrganizationMembers";

export const OrganizationSettingDropdown = () => {
  const {orgSlug} = useParams();
  const {openModal} = useModalStore();

  const {organization} = useOrganization(orgSlug ?? "")
  const {organizationMembersData} = useGetOrganizationMembers(orgSlug || "");

  const organizationMembers = organizationMembersData?.data?.members;
  const currentOrgName = organization?.data?.organization?.name;
  return (
    <Dropdown
      id="org-setting" // Unique ID registered in Zustand
      trigger={
        <div className="flex items-center border border-transparent hover:border-app-border hover:rounded-md p-0.5">
          <IoEllipsisHorizontal className="size-5" />
        </div>
      }
    >
      <ul className="flex flex-col gap-0.5">
        <li 
        onClick={() => openModal("add_org_member", {orgName: currentOrgName, orgMembers: organizationMembers})}
        className="flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer">
            <IoPersonOutline className="size-4"/>
            <span>Add Member</span>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer">
            <IoSettingsOutline className="size-4"/>
            <span>Edit details</span>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer text-priority-highest">
            <IoTrash className="size-4"/>
            <span>Delete organization</span>
        </li>
      </ul>
    </Dropdown>
  );
};
