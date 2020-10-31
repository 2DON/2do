interface ProjectMember {
  account: Account | number;
  team?: Team | number;
  permissions: 'VIEW' | 'MAN_TASKS' | 'MAN_MEMBERS' | 'MAN_PROJECT' | 'OWNER';
  createdAt: Date;
  createdBy: Account | number;
  updatedAt: Date;
  updatedBy: Account | number;
}
