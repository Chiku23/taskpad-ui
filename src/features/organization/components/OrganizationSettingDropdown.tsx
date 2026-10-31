import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "../../../components/ui/Dropdown";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoTrash,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import { useModalStore } from "../../../stores/useModalStore";
import { useOrganization } from "../hooks/useOrganization";

export const OrganizationSettingDropdown = () => {
  const { orgSlug } = useParams<{ orgSlug: string }>();
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  const { organization } = useOrganization(orgSlug ?? "");
  const currentOrg = organization?.data?.organization;

  const handleAddMember = () => {
    if (currentOrg) {
      openModal({
        activeModal: "add_org_member",
        modalData: currentOrg,
      });
    }
  };

  const handleGoToSettings = () => {
    if (orgSlug) {
      navigate(`/${orgSlug}/organization/settings`);
    }
  };

  return (
    <Dropdown
      id="org-setting" // Unique ID registered in Zustand
      trigger={
        <div className="flex items-center border border-transparent hover:border-app-border hover:rounded-md p-0.5 cursor-pointer">
          <IoEllipsisHorizontal className="size-5" />
        </div>
      }
      dropdownClassName="w-64 bg-app-input-bg border border-app-border rounded-md text-sm"
      triggerClassName="w-full"
    >
      <ul className="flex flex-col gap-0.5">
        <li>
          <button
            onClick={handleAddMember}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer text-left"
          >
            <IoPersonOutline className="size-4" />
            Add Member
          </button>
        </li>
        <li>
          <button
            onClick={handleGoToSettings}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer text-left"
          >
            <IoSettingsOutline className="size-4" />
            <span>Settings & Members</span>
          </button>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-app-border cursor-pointer text-priority-highest">
          <IoTrash className="size-4" />
          <span>Delete organization</span>
        </li>
      </ul>
    </Dropdown>
  );
};
