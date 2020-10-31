interface Task {
  id: number;
  ordinal: number;
  description: string;
  status: 'IN_PROGRESS' | 'DONE';
  options?: string;
  assignedTo?: number;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
