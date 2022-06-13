export interface SongAnalyze {
  title: string;
  description: string;
  url: string;
  profilePhoto: string;
  genres: string[];
  projectedEarnings: ProjectedEarnings;
  projectedListeners: ProjectedListeners;
  score: SongScore;
  songCharacteristics: SongCharacteristics;
  durationSeconds: number;
}

export interface ProjectedEarnings {
  currency: string;
  currencySymbol: string;
  amount: string;
}

export interface ProjectedListeners {
  amount: number;
  historicalChange: number;
}

export interface SongScore {
  chords: number;
  familiarity: number;
  melody: number;
  overall: number;
  starFactor: number;
}

export interface SongCharacteristics {
  bpm: number;
  elements: string[] | null;
  key: string;
  similarSongs: SimilarSong[];
  tags: string[];
  timeSignature: string;
  TrackID: string;
}

export interface SimilarSong {
  albumArt: string;
  artist: string;
  previewUrl: string;
  title: string;
  uri: string;
  url: string;
}
