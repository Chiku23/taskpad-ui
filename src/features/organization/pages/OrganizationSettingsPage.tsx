import { useState } from "react";
import { useParams } from "react-router-dom";
import { useOrganizations } from "../hooks/useOrganizations";
import { useGetOrganizationMembers } from "../hooks/useGetOrganizationMembers";
import { useRemoveOrgMember } from "../hooks/useRemoveOrgMember";
import { useUpdateOrgMemberRole } from "../hooks/useUpdateOrgMemberRole";
import { useUpdateOrganization } from "../hooks/useUpdateOrganization";
import { useModalStore } from "../../../stores/useModalStore";
import { useAuth } from "../../auth/hooks/useAuth";
import { formatDate } from "../../../utils/formatDate";
import type { OrgRole, OrganizationMember } from "../types/organizationTypes";
import {
  IoPersonAddOutline,
  IoTrashOutline,
  IoShieldCheckmarkOutline,
  IoBusinessOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const OrganizationSettingsPage = () => {
  const { orgSlug = "" } = useParams<{ orgSlug: string }>();
  const { user } = useAuth();
  const { openModal } = useModalStore();

  const { organizationsData } = useOrganizations();
  const organizations = organizationsData?.data.organizations || [];
  const currentOrg = organizations.find((org) => org.slug === orgSlug);

  const { organizationMembersData, isLoading: membersLoading } =
    useGetOrganizationMembers(orgSlug);
  const members: OrganizationMember[] =
    organizationMembersData?.data?.members || [];

  const { mutateRemoveOrgMember, isPending: isRemoving } =
    useRemoveOrgMember(orgSlug);
  const { mutateUpdateRole, isPending: isUpdatingRole } =
    useUpdateOrgMemberRole(orgSlug);
  const { mutateUpdateOrganization, isPending: isUpdatingOrg } =
    useUpdateOrganization();

  const [searchQuery, setSearchQuery] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const isOwner = currentOrg?.owner_id === user?.id;

  const handleOpenAddMember = () => {
    if (currentOrg) {
      openModal({
        activeModal: "add_org_member",
        modalData: currentOrg,
      });
    }
  };

  const handleRemoveMember = (member: OrganizationMember) => {
    if (
      !window.confirm(
        `Are you sure you want to remove ${
          member.user_name || member.user_email || `User #${member.user_id}`
        } from the organization?`
      )
    ) {
      return;
    }

    setActionError("");
    setActionSuccess("");
    mutateRemoveOrgMember(
      { slug: orgSlug, userId: member.user_id },
      {
        onSuccess: () => {
          setActionSuccess("Member removed successfully.");
        },
        onError: (err: any) => {
          setActionError(err?.message || "Failed to remove member.");
        },
      }
    );
  };

  const handleRoleChange = (userId: number, newRole: OrgRole) => {
    setActionError("");
    setActionSuccess("");
    mutateUpdateRole(
      { slug: orgSlug, userId, role: newRole },
      {
        onSuccess: () => {
          setActionSuccess("Member role updated.");
        },
        onError: (err: any) => {
          setActionError(err?.message || "Failed to update member role.");
        },
      }
    );
  };

  const handleSaveOrgName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameValue.trim()) return;

    setActionError("");
    setActionSuccess("");
    mutateUpdateOrganization(
      { name: nameValue.trim(), slug: orgSlug },
      {
        onSuccess: () => {
          setEditingName(false);
          setActionSuccess("Organization updated successfully.");
        },
        onError: (err: any) => {
          setActionError(err?.message || "Failed to update organization.");
        },
      }
    );
  };

  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase();
    const nameMatch = m.user_name?.toLowerCase().includes(q);
    const emailMatch = m.user_email?.toLowerCase().includes(q);
    const roleMatch = m.role?.toLowerCase().includes(q);
    return nameMatch || emailMatch || roleMatch;
  });

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Alert notices */}
      {actionError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center justify-between">
          <span>{actionError}</span>
          <button
            onClick={() => setActionError("")}
            className="text-xs hover:underline cursor-pointer ml-4"
          >
            Dismiss
          </button>
        </div>
      )}
      {actionSuccess && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-lg flex items-center justify-between">
          <span>{actionSuccess}</span>
          <button
            onClick={() => setActionSuccess("")}
            className="text-xs hover:underline cursor-pointer ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── Section 1: Organization Details ── */}
      <div className="border border-app-border rounded-xl bg-app-card p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-app-button/10 flex items-center justify-center text-app-button border border-app-border">
              <IoBusinessOutline className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-main">
                Organization Profile
              </h2>
              <p className="text-xs text-text-muted">
                General details and information about your organization.
              </p>
            </div>
          </div>

          {!editingName && isOwner && (
            <button
              onClick={() => {
                setNameValue(currentOrg?.name || "");
                setEditingName(true);
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-md border border-app-border hover:bg-app-item-hover text-text-main transition-colors cursor-pointer"
            >
              Edit Details
            </button>
          )}
        </div>

        {editingName ? (
          <form onSubmit={handleSaveOrgName} className="flex flex-col gap-3 pt-2">
            <div className="flex flex-col gap-1 max-w-md">
              <label
                htmlFor="org-name-edit"
                className="text-xs font-bold text-text-ghost uppercase"
              >
                Organization Name
              </label>
              <input
                id="org-name-edit"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold outline-none focus:border-app-button transition-colors"
                type="text"
                required
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="submit"
                disabled={isUpdatingOrg}
                className="bg-app-button hover:bg-app-button-hover text-black font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer disabled:opacity-60 transition-colors"
              >
                {isUpdatingOrg ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditingName(false)}
                className="text-xs font-semibold px-3 py-2 rounded-lg border border-app-border hover:bg-app-item-hover text-text-ghost hover:text-text-main transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-text-ghost uppercase tracking-wider">
                Name
              </span>
              <span className="text-sm font-semibold text-text-main">
                {currentOrg?.name ?? "—"}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-text-ghost uppercase tracking-wider">
                Slug
              </span>
              <span className="text-sm font-mono text-text-muted">
                {currentOrg?.slug ?? "—"}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-text-ghost uppercase tracking-wider">
                Total Members
              </span>
              <span className="text-sm font-semibold text-text-main">
                {members.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Section 2: Members Management ── */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-text-main">
                Organization Members
              </h2>
              <span className="text-xs bg-app-card border border-app-border text-text-muted px-2 py-0.5 rounded-full font-semibold">
                {members.length}
              </span>
            </div>
            <p className="text-xs text-text-muted">
              Manage who has access to this organization and configure their roles.
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
              <button
                onClick={handleOpenAddMember}
                className="flex items-center gap-1.5 bg-app-button hover:bg-app-button-hover text-black font-semibold text-xs px-3.5 py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                <IoPersonAddOutline className="size-4" />
                <span>Add Member</span>
              </button>
            )}
          </div>
        </div>

        {/* Members Table */}
        <div className="border rounded-xl border-app-border overflow-hidden bg-app-card shadow-sm">
          {membersLoading ? (
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
                  {filteredMembers.map((member) => {
                    const isMemberOwner =
                      currentOrg?.owner_id === member.user_id;
                    const displayName =
                      member.user_name ||
                      member.user_email?.split("@")[0] ||
                      `User #${member.user_id}`;
                    const initials = displayName
                      .slice(0, 2)
                      .toUpperCase();

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
                                {member.user_name || "—"}
                              </span>
                              <span className="text-xs text-text-ghost truncate">
                                {member.user_email || "No email available"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Role column */}
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          {isMemberOwner ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <IoShieldCheckmarkOutline className="size-3.5" />
                              Owner
                            </span>
                          ) : isOwner ? (
                            <select
                              value={member.role}
                              onChange={(e) =>
                                handleRoleChange(
                                  member.user_id,
                                  e.target.value as OrgRole
                                )
                              }
                              disabled={isUpdatingRole}
                              className="text-xs font-semibold border border-app-border bg-app-input-bg text-text-main rounded-md px-2 py-1 outline-none focus:border-app-button transition-colors cursor-pointer"
                            >
                              <option value="member">Member</option>
                              <option value="admin">Admin</option>
                            </select>
                          ) : (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${
                                member.role === "admin"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                              }`}
                            >
                              {member.role}
                            </span>
                          )}
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
                              <button
                                onClick={() => handleRemoveMember(member)}
                                disabled={isRemoving}
                                title="Remove member"
                                aria-label={`Remove ${displayName}`}
                                className="size-7 inline-flex items-center justify-center rounded hover:bg-red-500/10 text-text-ghost hover:text-red-400 transition-colors cursor-pointer"
                              >
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
