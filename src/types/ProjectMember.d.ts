interface ProjectMember {
  accountId: number;
  teamId?: number;
  permission: ProjectMemberPermission;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
