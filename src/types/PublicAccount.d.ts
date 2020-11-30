interface PublicAccount {
  id: number;
  email: string;
  name: string;
  avatarUrl?: string;
  premium: boolean;
  verificationSentAt: Date;
}
