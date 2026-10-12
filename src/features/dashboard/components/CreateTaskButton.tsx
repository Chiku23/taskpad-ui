import { Button } from "../../../components/ui/Button";

export const CreateTaskButton = () => {
    return(
        <Button type="button" className="bg-app-button hover:bg-app-button-hover px-2 py-1 rounded-lg font-poppins text-sm">
            New Task
        </Button>
    )
}