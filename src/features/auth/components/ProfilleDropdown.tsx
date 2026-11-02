import { Dropdown } from "../../../components/ui/Dropdown";
import { IoPersonCircleOutline, IoSettingsOutline, IoColorPaletteOutline, IoLogOutOutline   } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../api/authApi";
import { useQueryClient } from "@tanstack/react-query";

export const ProfileDropdown = () => {
  const {user} = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = async(e) => {
    e.preventDefault();

    await logoutUser();
    queryClient.invalidateQueries({queryKey: ["authUser"]})
  }
  return (
    <Dropdown
      id="profile"
      trigger={
        <div className="hover:text-text-ghost cursor-pointer">
          <IoPersonCircleOutline className="size-5" />
        </div>
      }
      dropdownClassName="w-84 mt-4 text-left border border-app-border rounded-sm right-0 bg-app-input-bg"
      triggerClassName="flex items-center justify-center"
    >
      <div className="flex items-center rounded-sm bg-black/50 m-2 p-2 gap-2 text-text-main">
        <div className="rounded-full size-10 flex items-center justify-center bg-green-800">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="text-xl">{user?.name}</span>
          <span className="text-sm text-text-ghost">
            {user?.email}
          </span>
        </div>
      </div>
      <ul className="flex text-sm flex-col gap-1 py-2">
        <li>
            <button className="flex items-center gap-2 w-full hover:bg-app-border cursor-pointer py-2 px-4 rounded-sm">
                <IoPersonCircleOutline className="size-5"/>
                Profile
            </button>
        </li>
        <li>
          <button className="flex items-center gap-2 w-full hover:bg-app-border cursor-pointer py-2 px-4 rounded-sm">
            <IoSettingsOutline className="size-5"/>
            Account setting
          </button>
        </li>
        <li>
            <button className="flex items-center gap-2 w-full hover:bg-app-border cursor-pointer py-2 px-4 rounded-sm">
                <IoColorPaletteOutline  className="size-5"/>
                Theme
            </button>
        </li>
      <div className="border-t border-app-border"></div>
      <li>
         <button 
         onClick={handleLogout}
         className="flex items-center gap-2 w-full hover:bg-app-border cursor-pointer py-2 px-4 rounded-sm">
                <IoLogOutOutline   className="size-5"/>
                Logout
         </button>
      </li>
      </ul>
    </Dropdown>
  );
};
