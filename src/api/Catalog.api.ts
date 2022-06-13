import { CatalogItem } from '../model/CatalogItem';
import { SongAnalyze } from './../model/SongAnalyze';
import { HttpClient } from './HttpClient';

export class CatalogApi {
  public static async fetchAll(): Promise<CatalogItem[]> {
    const { data } = await HttpClient.getInstance().get<CatalogItem[]>('/catalogs');

    
    for (const item of data) {
      const itemData = await CatalogApi.fetch(item.id);
      item.title = itemData.title;
    }

    return data;
  }

  public static async fetch(id: number): Promise<SongAnalyze> {
    const { data } = await HttpClient.getInstance().get<{
      created_time: string;
      data: SongAnalyze;
      id: number;
      last_seen_time: string;
      length: number;
      user_id: number;
    }>(`/catalogs/${id}`);

    return data.data;
  }
}
