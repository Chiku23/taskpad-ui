import { StatsCard } from "../components/StatsCard";
import { VscIssues } from "react-icons/vsc";
import { MdOutlineWatchLater } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { MdTaskAlt } from "react-icons/md";


export const DashboardPage = () => {
    return(
        <div className="flex flex-col bg-app-canvas min-h-screen py-10 px-20">
            {/*header */}
            <div className="mb-10">
                <h1 className="text-text-main text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-text-ghost">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, tempore.</p>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                <StatsCard 
                type="issue" 
                data="128" 
                icon={<VscIssues className="size-6"/>}/>
            
                <StatsCard 
                type="open" 
                data="24" 
                icon={<MdOutlineWatchLater className="size-6"/>}/>
            
                <StatsCard 
                type="in progress" 
                data="46" 
                icon={<GrInProgress className="size-5"/>}/>
            
            
                <StatsCard 
                type="done" 
                data="34" 
                icon={<MdTaskAlt className="size-6"/>}/>
                </div>
            
            {/* content */}
            <div className="grid grid-cols-3 gap-8 my-10">
                {/* takes 2/3 of the parent content div */}
                <div className="col-span-2 border-t-3 border-blue-700 rounded-md">

                    {/* header */}
                    <div className="flex justify-between items-center bg-app-card border-b border-app-border px-4 py-3 text-text-muted">
                        <h3 className="font-semibold">My Open Issues</h3>
                        <button className="text-text-ghost">View all</button>
                    </div>

                    {/* issues or tasks */}
                    <div className="px-4 py-2">
                        <div>

                            {/* logo and task title */}
                            <div className="flex gap-2">
                            </div>

                            {/* labels */}
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* takes remaining 1/3 */}
                <div className="col-span-1 border-t-3 border-blue-700 rounded-md">
                    {/* header */}
                    <div className="flex justify-between items-center bg-app-card border-b border-app-border px-4 py-3">
                        <h3 className="font-semibold text-text-muted">Recent Activity</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}