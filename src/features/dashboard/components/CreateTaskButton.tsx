import { Button } from "../../../components/ui/Button";
import { IoIosAdd } from "react-icons/io";
import { useModalStore } from "../../../stores/useModalStore";
import { useGetProjects } from "../../projects/hooks/useGetProjects";

interface CreateTaskButtonProps {
    slug?: string;
}

export const CreateTaskButton = ({slug}: CreateTaskButtonProps) => {
    const {openModal} = useModalStore();
    const {projectsData, isLoading} = useGetProjects(slug || "");
    const projects = projectsData?.data?.projects || [];
    return(
        <Button 
            type="button" 
            onClick={() => openModal({
                activeModal: "create_task",
                modalData: {projects, isLoading}
            })}
            className="flex items-center justify-center cursor-pointer h-full px-2 text-sm text-black rounded-md font-bold bg-app-button"
        >
            New Task
            <IoIosAdd className="size-6"/>
        </Button>
    );
};