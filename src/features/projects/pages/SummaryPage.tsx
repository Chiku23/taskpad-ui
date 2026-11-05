import { StatCard } from "../components/StatCard";

const ITEMS = [
  { id: 1, name: "Completed", icon: "done" as const, data: 2 },
  { id: 2, name: "Updated", icon: "updated" as const, data: 8 },
  { id: 3, name: "Created", icon: "created" as const, data: 15 },
  { id: 4, name: "Due soon", icon: "due" as const, data: 3 },
];

export const SummaryPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* task record panels */}
      {ITEMS.map((item) => {
        return (
          <StatCard
            key={item.id}
            name={item.name}
            icon={item.icon}
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
