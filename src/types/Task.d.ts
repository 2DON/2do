interface Task {
  id: number;
  ordinal: number;
  description: string;
  status: TaskStatus;
  options?: string;
  assignedTo?: number;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
