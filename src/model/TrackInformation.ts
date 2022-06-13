import { ProjectedEarnings, ProjectedListeners, SongCharacteristics } from './SongAnalyze';

export interface TrackInformation {
  description: string;
  durationSeconds: number;
  genres: string[];
  id: string;
  projectedEarnings: ProjectedEarnings;
  projectedListeners: ProjectedListeners;
  score: TrackScore;
  songCharacteristics: SongCharacteristics;
  title: string;
  url: string;
}

interface TrackScore {
  impactful_attributes: Array<{
    attribute_name: string;
    attribute_score: number;
  }>;
  overall: number;
  starFactor: number;
}
