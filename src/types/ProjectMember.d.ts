interface ProjectMember {
  account: Account;
  team?: Team | number;
  permissions: 'VIEW' | 'MAN_TASKS' | 'MAN_MEMBERS' | 'MAN_PROJECT' | 'OWNER';
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
