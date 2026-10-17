import type { ReactNode } from "react"

interface StarCardProps {
    name: string,
    icon: ReactNode,
    data: number
}
export const StatCard = ({name, icon, data}: StarCardProps) => {
    return(
        <div className="flex items-center gap-2 border border-app-border bg-app-card p-2 rounded-sm">
            <span className="border p-2 rounded-lg border-app-border">{icon}</span>
            <div className="flex gap-2">
            <p>{data}</p>
            <p>{name}</p>
            </div>
        </div>
    )
}