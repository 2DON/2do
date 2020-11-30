interface Project {
  id: number;
  icon?: string;
  ordinal: number;
  description: string;
  observation?: string;
  archived: boolean;
  options?: string;
  accessLevel: ProjectMemberPermission;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
