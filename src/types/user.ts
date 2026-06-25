export interface IUser {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  provider: string;
  role: string;
  status: 'active' | "deleted";
  credit_count: number;
  created_at: string;
  updated_at: string;
  referral_source?: string;
}
