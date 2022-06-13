import { TrackInformation } from '../model/TrackInformation';
import { SongAnalyze } from './../model/SongAnalyze';
import { HttpClient } from './HttpClient';
import { SecondaryHttpClient } from './SecondaryHttpClient';

export interface DataForAnalyze {
  description: string;
  file: File;
  tags: string[];
  title: string;
}

export class SongsApi {
  public static async upload(request: DataForAnalyze): Promise<{
    catalog_id: number;
    song_analysis: SongAnalyze;
  }> {
    const formData = new FormData();
    formData.append('file', request.file, request.file.name);
    formData.append('title', request.title);
    formData.append('description', request.description);
    request.tags.forEach((tag) => {
      formData.append('tags[]', tag);
    });

    const { data } = await HttpClient.getInstance().post<{
      catalog_id: number;
      song_analysis: SongAnalyze;
    }>('/songs/analysis', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }

  public static async get(dashboardId: string, trackId: string): Promise<TrackInformation> {
    const { data } = await SecondaryHttpClient.getInstance().get(`/songs/${dashboardId}/${trackId}`);
    return data.data;
  }
}
