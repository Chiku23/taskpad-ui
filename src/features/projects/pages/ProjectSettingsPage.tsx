import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectMembers } from "../hooks/useGetProjectMembers";
import {
  IoAlbums,
  IoTrashOutline,
  IoSearchOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetProject } from "../hooks/useGetProject";
import { useAuth } from "../../auth/hooks/useAuth";
import { formatDate } from "../../../utils/formatDate";

export const ProjectSettingsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { projectSlug } = useParams();
  const { user } = useAuth();
  const { projectMembersData, isLoading } = useGetProjectMembers(
    projectSlug || "",
  );

  const { projectData } = useGetProject(projectSlug || "");

  const members = projectMembersData?.data?.members || [];
  const currentProject = projectData?.data?.project;

  const isOwner = currentProject?.lead_id === user.id;

  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase();
    const nameMatch = m.user_name?.toLowerCase().includes(q);
    const emailMatch = m.user_email?.toLowerCase().includes(q);
    const roleMatch = m.role?.toLowerCase().includes(q);
    return nameMatch || emailMatch || roleMatch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-app-border bg-app-card p-4 rounded-lg">
        <div className="flex flex-col gap-8 p-6">
          {/*Heading */}
          <div className="flex items-center gap-4">
            <IoAlbums className="size-10 border text-app-button border-app-border bg-app-button/10 p-2 rounded-lg" />
            <div className="flex flex-col">
              <span className="font-bold text-xl">Project Details</span>
              <p className="text-xs text-text-ghost">
                General details and information about your project
              </p>
            </div>
          </div>

          {/* project info */}
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <span className="text-xs text-text-ghost">TOTAL MEMBERS</span>
              <span className="text-sm font-bold">{members.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Project management area change based on role*/}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-text-main">
                Project Members
              </h2>
              <span className="text-xs bg-app-card border border-app-border text-text-muted px-2 py-0.5 rounded-full font-semibold">
                {members.length}
              </span>
            </div>
            <p className="text-xs text-text-muted">
              {isOwner
                ? "Manage who has access to this organization and configure their roles."
                : "Search and connect with project members"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search filter */}
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-ghost" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter members…"
                className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-app-border bg-app-input-bg text-text-main outline-none focus:border-app-button transition-colors w-44 sm:w-56"
              />
            </div>

            {/* Add Member button */}
            {isOwner && (
              <button className="flex items-center gap-1.5 bg-app-button hover:bg-app-button-hover text-black font-semibold text-xs px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors shadow-sm">
                <IoPersonAddOutline className="size-4" />
                <span className="hidden md:flex">Add Member</span>
              </button>
            )}
          </div>
        </div>
        {/* members list */}
        <div className="border rounded-xl border-app-border overflow-hidden bg-app-card shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center p-12 text-text-ghost gap-2">
              <AiOutlineLoading3Quarters className="size-5 animate-spin" />
              <span className="text-sm">Loading members…</span>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center text-text-ghost gap-2">
              <p className="text-sm font-semibold">No members found</p>
              {searchQuery ? (
                <p className="text-xs text-text-ghost">
                  No members match "{searchQuery}"
                </p>
              ) : (
                <p className="text-xs text-text-ghost">
                  No members belong to this organization yet.
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-text-muted text-[11px] font-semibold uppercase tracking-wider border-b border-app-border bg-app-input-bg/40">
                    <th className="px-5 py-3">User</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Joined</th>
                    {isOwner && (
                      <th className="px-5 py-3 text-right">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-border text-text-muted text-sm">
                  {members.map((member) => {
                    const isMemberOwner = member.user_id === currentProject?.lead_id;
                    const initials = member?.user_name
                      ?.slice(0, 1)
                      .toUpperCase();
                    const currentUser = member.user_id === user.id;
                    return (
                      <tr
                        key={member.id || member.user_id}
                        className="hover:bg-app-item-hover/30 transition-colors"
                      >
                        {/* User column */}
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-app-button/20 border border-app-button/40 flex items-center justify-center text-text-main font-bold text-xs shrink-0">
                              {initials}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-text-main truncate">
                                {currentUser ? `${member.user_name} (You)` : member.user_name}
                              </span>
                              <span className="text-xs text-text-ghost truncate">
                                {member.user_email || "No email available"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Role column */}
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className="capitalize border px-2 py-1 rounded-full">
                            {member.role}
                          </span>
                        </td>

                        {/* Joined column */}
                        <td className="px-5 py-3.5 whitespace-nowrap text-xs text-text-ghost">
                          {formatDate(member.joined_at || member.created_at) ||
                            "—"}
                        </td>

                        {/* Actions column */}
                        {isOwner && (
                          <td className="px-5 py-3.5 whitespace-nowrap text-right">
                            {!isMemberOwner && (
                              <button className="size-7 inline-flex items-center justify-center rounded hover:bg-red-500/10 text-text-ghost hover:text-red-400 transition-colors cursor-pointer">
                                <IoTrashOutline className="size-4" />
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
