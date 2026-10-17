import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { PROJECTS } from "../../../seed/project";
import { IoIosMore } from "react-icons/io";
import { CgGlobeAlt } from "react-icons/cg";
import { LiaThListSolid } from "react-icons/lia";
import { HiOutlineViewBoards } from "react-icons/hi";
import { RiTeamFill } from "react-icons/ri";

const NAV_ITEMS = [
  {id: "1", name: "Summary", path: "summary", icon: CgGlobeAlt},
  {id: "2", name: "List", path: "list", icon: LiaThListSolid},
  {id: "3", name: "Board", path: "board", icon: HiOutlineViewBoards}
]

export const ProjectLayout = () => {
  const location = useLocation();
  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS.find((p) => String(p.id) === projectId);

  return (
    <div className="flex flex-col bg-app-canvas min-h-screen">
      <div className="sticky top-0 flex flex-col gap-2 border-b border-app-border bg-app-canvas pt-5 px-10">

        {/*header */}
        <div className="flex items-center text-text-muted gap-1">
          <h1 className="text-2xl font-semibold capitalize">{project?.name}</h1>
          <RiTeamFill className="border size-6 rounded-sm p-1 border-app-border"/>
          <button className="size-6 flex items-center justify-center hover:bg-gray-600 rounded-sm">

          <IoIosMore />
          </button>
        </div>

        {/*navigation */}
        <nav className="mt-4">
          <ul className="flex gap-4 text-text-ghost text-sm">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.endsWith(item.path);

              return(
                <li key={item.id}> 
                <Link to={item.path} className={`flex items-center gap-1 px-1 ${isActive ? "border-b-2 border-text-muted": ""}`}>
                    <Icon className="size-6" />
                    <span className="font-bold">{item.name}</span>
                </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};
