import type { ReactNode } from "react";

interface StatsProps {
  type: "issue" | "open" | "in progress" | "done";
  icon: ReactNode;
  data: string | number;
  className?: string;
}

const colorTypes = {
  issue: {
    text: "text-status-todo-txt",
    icon: "text-status-todo-txt",
    iconBg: "bg-status-todo-bg",
  },
  open: {
    text: "text-status-todo-txt",
    icon: "text-status-todo-txt",
    iconBg: "bg-status-todo-bg", 
  },
  "in progress": {
    text: "text-status-progress-txt",
    icon: "text-status-progress-txt",
    iconBg: "bg-status-progress-bg", 
  },
  done: {
    text: "text-status-done-txt",
    icon: "text-status-done-txt",
    iconBg: "bg-status-done-bg", 
  },
};

export const StatsCard = ({ type, icon, data, className = "" }: StatsProps) => {
    const style = colorTypes[type];
  return (
    <div className={`flex flex-col gap-2 rounded-xl border border-app-border bg-app-card p-4 transition-colors hover:bg-app-card-hover ${className}`}>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium uppercase tracking-wider ${style.text}`}>
          {type}
        </span>
        <div className={`${style.icon} ${style.iconBg} p-2 rounded-lg flex items-center justify-center [&>svg]:h-5 [&>svg]:w-5`}>
          {icon}
        </div>
        
      </div>
      
      <p className="text-2xl font-semibold text-app-text">{data}</p>
    </div>
  );
};
