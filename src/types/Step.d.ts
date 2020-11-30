interface Step {
  id: number;
  ordinal: number;
  description: string;
  status: StepStatus;
  observation?: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
