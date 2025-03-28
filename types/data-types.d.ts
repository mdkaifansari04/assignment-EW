import { User } from ".";

export interface AuthResponse {
  token: string;
}

interface SupportInfo {
  url: string;
  text: string;
}

interface UserApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: SupportInfo;
}

export interface UserUpdateResponse extends User {
  updatedAt: string;
}
