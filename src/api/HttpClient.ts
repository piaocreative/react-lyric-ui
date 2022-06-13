import axios, { AxiosInstance } from 'axios';

/**
 * Test credentials
 *
 * "email": "marcciosilva@email.com",
 * "password": "marccio1234"
 */
export class HttpClient {
  private static readonly BASE_URL = 'https://api.lyricai.co/v2';
  private static readonly TIMEOUT = 30_000;
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!HttpClient.instance) {
      HttpClient.instance = axios.create({
        baseURL: HttpClient.BASE_URL,
        timeout: HttpClient.TIMEOUT,
      });
    }

    return HttpClient.instance;
  }

  public static setToken(token: string): void {
    HttpClient.instance = axios.create({
      baseURL: HttpClient.BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: HttpClient.TIMEOUT,
    });
  }

  public static clearToken(): void {
    HttpClient.instance = axios.create({
      baseURL: HttpClient.BASE_URL,
      timeout: HttpClient.TIMEOUT,
    });
  }
}
