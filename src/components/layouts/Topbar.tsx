import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { CreateTaskButton } from "../../features/dashboard/components/CreateTaskButton";

interface TopbarProps {
    onToggleSidebar: () => void,
    isSidebarOpen: boolean
}

export const Topbar = ({onToggleSidebar, isSidebarOpen}: TopbarProps) => {
    return(
        <div className="p-2 absolute top-0 w-full sticky bg-app-topbar flex items-center justify-between">
            <div className="mx-5 flex text-text-muted">
                <button onClick={onToggleSidebar}>
                {isSidebarOpen ? 
                 <GoSidebarExpand className="size-6" />
                 : <GoSidebarCollapse className="size-6"/>
                }
                </button>
            </div>
            {/* Logo */}
            <div className="flex flex-col space-y-0">
                <p className="text-xl text-app-brand m-0 leading-none">Taskpad</p>
                <p className="text-text-ghost text-sm m-0 leading-none">Manage your all task smartly</p>
            </div>

            <input 
            type="search" 
            placeholder="Search" 
            className="border border-app-input-border w-lg px-2 py-1 mx-10 rounded-lg outline-none"/>
            <CreateTaskButton />

            {/* user related */}
            <div className="flex items-center gap-3 text-text-muted">
                {/* notifications */}
                <IoIosNotificationsOutline className="size-6"/>
                {/* settings */}
                <IoSettingsOutline className="size-5"/>
            </div>
        </div>
    )
}