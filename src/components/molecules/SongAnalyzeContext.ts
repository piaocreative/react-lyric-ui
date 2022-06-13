import { createContext } from 'react';
import { SongAnalyze } from './../../model/SongAnalyze';

export const SongAnalyzeContext = createContext<SongAnalyze>({} as any);
