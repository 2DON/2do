interface Account {
  id: number;
  email: string;
  name: string;
  avatarUrl?: string;
  premium: boolean;
  options?: string;
  createdAt: Date;
  updatedAt: Date;
}
