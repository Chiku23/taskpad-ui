import {
    User,
    LayoutDashboard,
    CircleDot,
    Settings,
    LoaderCircle, 
    ChevronUp,
    ChevronDown,
    Plus,
    FolderKanban,
    Building,
    SidebarClose,
    SidebarOpen,
    BellIcon,
    X,
    Search,
    LogOut,
    Palette,
    Hourglass,
    Clock,
    CircleCheckBig,
    Ellipsis,
    Trash,
    Crown,
    Globe,
    TableProperties,
    Columns3,
    StickyNotePlus,
    FilePen,
    CalendarDays

    ,type LucideProps} from "lucide-react";

const icons = {
    user: User,
    dashboard: LayoutDashboard,
    issue: CircleDot,
    settings: Settings,
    loader: LoaderCircle,
    angleup: ChevronUp,
    angleDown: ChevronDown,
    plus: Plus,
    project: FolderKanban,
    organization: Building,
    sidebarOpen: SidebarOpen,
    sidebarClose: SidebarClose,
    notification: BellIcon,
    close: X,
    search: Search,
    logout: LogOut,
    theme: Palette,
    progress: Hourglass,
    clock: Clock,
    done: CircleCheckBig,
    created: StickyNotePlus,
    updated: FilePen,
    ellipsis: Ellipsis,
    delete: Trash,
    owner: Crown,
    globe: Globe,
    table: TableProperties,
    column: Columns3,
    due: CalendarDays
}

interface LucideIconProps extends Omit<LucideProps, 'name'> {
    name: keyof typeof icons;
}

export const Icon = ({name, size, color, className, ...props}: LucideIconProps) => {
    const IconComponent = icons[name];

    if(!IconComponent) return null;
    return (
        <IconComponent 
        size={size} 
        color={color}
        className={className}
        {...props}/>
    )
}