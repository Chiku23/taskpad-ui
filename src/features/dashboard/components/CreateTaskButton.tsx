import { Button } from "../../../components/ui/Button";
import { IoIosAdd } from "react-icons/io";
import { useModalStore } from "../../../stores/useModalStore";


export const CreateTaskButton = () => {
    const {openModal} = useModalStore();
    return(
        <Button 
        type="button" 
        onClick={() => openModal({
            activeModal: "create_task",
            modalData: null
        })}
        className="flex items-center justify-center cursor-pointer h-full px-2 text-sm text-black rounded-md font-public-sans font-light bg-app-button">
            New Task
            <IoIosAdd className="size-5"/>
        </Button>
    )
}