import { ModalShell } from "./ModalShell";
import { useModalStore } from "../../stores/useModalStore";
import { CreateOrganizationModal } from "../../features/organization/components/CreateOrganizationModal";
import { CreateProjectModal } from "../../features/organization/components/CreateProjectModal";
import { EditProjectModal } from "../../features/projects/components/EditProjectModal";
import { CreateTaskModal } from "../../features/issues/components/CreateTaskModal";
import { AddOrgMemberModal } from "../../features/organization/components/AddOrgMemberModal";
import { AddProjectMemberModal } from "../../features/organization/components/AddProjectMemberModal";
import type { Organization } from "../../features/organization/types/organizationTypes";

export const ModalRegistry = () => {
  const { activeModal, modalData, closeModal } = useModalStore();

  if (!activeModal) return null;

  const getModalConfig = () => {
    switch (activeModal) {
      case "create_organization":
        return {
          title: "Create New Organization",
          className: "max-w-md",
          content: <CreateOrganizationModal onSuccess={closeModal} />,
        };

      case "create_task":
        return {
          title: "Create New Task",
          className: "max-w-2xl",
          content: (
            <CreateTaskModal
              onSuccess={closeModal}
              projectData={modalData?.projects}
              isLoading={modalData?.isLoading}
            />
          ),
        };

      case "create_project":
        return {
          title: "Add New Project",
          className: "max-w-md",
          content: <CreateProjectModal onSuccess={closeModal} />,
        };

      case "edit_project":
        return {
          title: "Edit Project Details",
          className: "max-w-md",
          content: <EditProjectModal onSuccess={closeModal} />,
        };

      case "add_org_member": {
        const orgData = modalData as Organization | undefined;
        return {
          title: orgData?.name ? `Add Member To ${orgData.name}` : "Add Member",
          className: "max-w-md",
          content: <AddOrgMemberModal onSuccess={closeModal} />,
        };
      }

      case "add_project_member":
        return {
          title: modalData?.name ? `Add Member To ${modalData.name}` : "Add Member",
          className: "max-w-md",
          content: (
            <AddProjectMemberModal onSuccess={closeModal} projectData={modalData} />
          ),
        };

      default:
        return null;
    }
  };

  const config = getModalConfig();
  if (!config) return null;

  return (
    <ModalShell
      modalShellClassName={config.className}
      title={config.title}
      onClose={closeModal}
    >
      {config.content}
    </ModalShell>
  );
};
