export interface AddSongRequest {
  description: string;
  file: string;
  genres?: string[];
  tags?: string[];
  title: string;
}
