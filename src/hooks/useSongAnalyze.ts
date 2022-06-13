import { useContext } from 'react';
import { SongAnalyzeContext } from './../components/molecules/SongAnalyzeContext';
import { SongAnalyze } from './../model/SongAnalyze';

export function useSongAnalyze(): SongAnalyze {
  return useContext(SongAnalyzeContext);
}
