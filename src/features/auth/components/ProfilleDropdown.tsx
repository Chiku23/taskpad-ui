import { useQueryClient } from "@tanstack/react-query";

import { Dropdown } from "../../../components/ui/Dropdown";
import { Icon } from "../../../components/ui/Icon";

import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../api/authApi";

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
          <Icon name="user" className="size-5" />
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
                <Icon name="user" className="size-5"/>
                Profile
            </button>
        </li>
        <li>
          <button className="flex items-center gap-2 w-full hover:bg-app-border cursor-pointer py-2 px-4 rounded-sm">
            <Icon name="settings" className="size-5"/>
            Account setting
          </button>
        </li>
        <li>
            <button className="flex items-center gap-2 w-full hover:bg-app-border cursor-pointer py-2 px-4 rounded-sm">
                <Icon name="theme"  className="size-5"/>
                Theme
            </button>
        </li>
      <div className="border-t border-app-border"></div>
      <li>
         <button 
         onClick={handleLogout}
         className="flex items-center gap-2 w-full hover:bg-app-border cursor-pointer py-2 px-4 rounded-sm">
                <Icon name="logout" className="size-5"/>
                Logout
         </button>
      </li>
      </ul>
    </Dropdown>
  );
};
