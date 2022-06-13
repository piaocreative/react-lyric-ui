export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  last_seen_time: string;
  login_time: string;
  session_key: string;
  user_id: number;
}

export interface RegisterRequest {
  creator_alias?: string;
  email: string;
  first: string;
  genres: string[];
  last: string;
  password: string;
  profile_photo_url?: string;
}
