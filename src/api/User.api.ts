import { User } from '../model/User';
import { HttpClient } from './HttpClient';

export class UserApi {
  public static async fetchById(id: number): Promise<User> {
    const { data } = await HttpClient.getInstance().get<User>(`/users/${id}`);

    return data;
  }
}
