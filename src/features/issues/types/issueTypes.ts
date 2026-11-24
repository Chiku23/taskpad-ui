export type IssueType = "epic" | "story" | "task" | "bug" | "subtask";
export type IssueStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done";
export type IssuePriority = "lowest" | "low" | "medium" | "high" | "highest";

export type Issue = {
    title: string;
    description: string | null;
    type: IssueType | null;
    status: IssueStatus | null;
    priority: IssuePriority | null;
    story_points: number | null;
    due_date: string | null;
    parent_id: number | null;
    sprint_id: number | null;
    assignee_ids: number[] | null;
    label_ids: number[] | null
}

export type IssueFilters = {
    projectSlug: string;
    status?: IssueStatus;
    type?: IssueType;
    assignee?: number;
    sprint_id?: number;
    priority?: IssuePriority;
    label?: number;
    search?: string;
}
