import { LoginRequest, LoginResponse, RegisterRequest } from './Auth.dto';
import { HttpClient } from './HttpClient';

export class AuthApi {
  public static async signIn(request: LoginRequest): Promise<LoginResponse> {
    const { data } = await HttpClient.getInstance().post<LoginResponse>('/login', request);

    return data;
  }

  public static async signUp(request: RegisterRequest): Promise<LoginResponse> {
    const { data } = await HttpClient.getInstance().post<LoginResponse>('/signup', request);

    return data;
  }
}
