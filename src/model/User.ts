export interface User {
  creator_alias: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  musical_genres: UserMusicalGenre[];
  password_hash: string;
  profile_photo_url: string;
  type: 'general';
}

export interface UserMusicalGenre {
  id: number;
  name: string;
}
