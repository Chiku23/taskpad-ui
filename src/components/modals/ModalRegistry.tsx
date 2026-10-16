import { useModalStore } from "../../stores/useModalStore";
import { ModalShell } from "./ModalShell";

import { CreateOrganizationModal } from "../../features/organization/components/CreateOrganizationModal";
import { CreateProjectModal } from "../../features/organization/components/CreateProjectModal";
import { CreateTaskModal } from "../../features/dashboard/components/CreateTaskModal";

export const ModalRegistry = () => {
    const {activeModal, modalData, closeModal} = useModalStore();

    if(!activeModal) return null;

    const renderModal = () => {
        switch(activeModal){
            case "create_organization":
                return <CreateOrganizationModal onSuccess={closeModal}/>
            case "create_task":
                return <CreateTaskModal onSuccess={closeModal}/>
            case "create_project":
                return <CreateProjectModal onSuccess={closeModal}/>
            default:
                return null;
        }
    }

    const getModalTitle = () => {
        switch(activeModal){
            case "create_organization":
                return modalData ? "Edit Organization Details" : "Create New Organization";
            case "create_task":
                return modalData ? "Edit Task Details" : "Create New Task";
            case "create_project":
                return modalData ? "Edit Project Details" : "Add New Project";
            default:
                return "";
        }
    }

    return(
        <ModalShell title={getModalTitle()} onClose={closeModal}>
            {renderModal()}
        </ModalShell>
    )
}