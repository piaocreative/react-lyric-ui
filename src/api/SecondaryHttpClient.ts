import axios, { AxiosInstance } from 'axios';

/**
 * Test credentials
 * 
 * "email": "marcciosilva@email.com",
 * "password": "marccio1234"
 */
export class SecondaryHttpClient {
  private static readonly BASE_URL = 'https://data.lyricai.co';
  private static readonly TIMEOUT = 40_000;
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!SecondaryHttpClient.instance) {
      SecondaryHttpClient.instance = axios.create({
        baseURL: SecondaryHttpClient.BASE_URL,
        timeout: SecondaryHttpClient.TIMEOUT,
      });
    }

    return SecondaryHttpClient.instance;
  }

  public static setToken(token: string): void {
    SecondaryHttpClient.instance = axios.create({
      baseURL: SecondaryHttpClient.BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: SecondaryHttpClient.TIMEOUT,
    });
  }

  public static clearToken(): void {
    SecondaryHttpClient.instance = axios.create({
      baseURL: SecondaryHttpClient.BASE_URL,
      timeout: SecondaryHttpClient.TIMEOUT,
    });
  }
}
