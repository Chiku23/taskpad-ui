import { MdTaskAlt } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { GrChapterAdd } from "react-icons/gr";
import { MdOutlineCalendarMonth } from "react-icons/md";

import { StatCard } from "../components/StatCard";

const ITEMS = [
  { id: 1, name: "Completed", icon: MdTaskAlt, data: 2 },
  { id: 2, name: "Updated", icon: TbSubtask, data: 8 },
  { id: 3, name: "Created", icon: GrChapterAdd, data: 15 },
  { id: 4, name: "Due soon", icon: MdOutlineCalendarMonth, data: 3 },
];

export const SummaryPage = () => {
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* task record panels */}
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <StatCard
            key={item.id}
            name={item.name}
            icon={<Icon className="size-6" />}
            data={item.data}
          />
        );
      })}

      {/* status overview graph */}
      <div className="col-span-full border border-app-border bg-app-card rounded-sm p-2">
        <h3>Status overview</h3>
        <div className="text-sm font-light text-text-muted">
          <p>To do: 2</p>
          <p>In progress: 3</p>
        </div>
      </div>

      {/*project activity */}
      <div className="col-span-full lg:col-span-3 border border-app-border bg-app-card rounded-sm p-2">
        <h3 className="text-lg">Recent activity</h3>
      </div>

      {/*workload */}
      <div className="col-span-1 border border-app-border bg-app-card rounded-sm p-2">
        <h3>Team workload</h3>
      </div>
    </div>
  );
};
