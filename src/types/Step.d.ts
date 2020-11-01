interface Step {
  id: number;
  ordinal: number;
  description: string;
  status: 'IN_PROGRESS' | 'DONE';
  observation?: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
